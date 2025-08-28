import os
import json
import textwrap
import requests
from typing import List, Dict, Any

# --- Config ---------------------------------------------------------------
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
REPO = os.environ.get("GITHUB_REPOSITORY")  # e.g. owner/repo
PR_NUMBER = int(os.environ.get("PR_NUMBER", "0"))
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")
MAX_PATCH_CHARS = int(os.environ.get("MAX_PATCH_CHARS", "100000"))

if not (GITHUB_TOKEN and REPO and PR_NUMBER and GROQ_API_KEY):
    raise SystemExit("Missing one of: GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, GROQ_API_KEY")

owner, repo = REPO.split("/")

# --- GitHub helpers -------------------------------------------------------
GH = requests.Session()
GH.headers.update(
    {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "ai-pr-review-poc"
    }
)

API = f"https://api.github.com/repos/{owner}/{repo}"


def gh_get(url: str, **kwargs) -> Any:
    r = GH.get(url, timeout=60, **kwargs)
    r.raise_for_status()
    return r.json()


def gh_post(url: str, payload: Dict[str, Any]) -> Any:
    r = GH.post(url, json=payload, timeout=60)
    r.raise_for_status()
    return r.json()


# --- Collect PR context ---------------------------------------------------
pr = gh_get(f"{API}/pulls/{PR_NUMBER}")
files: List[Dict[str, Any]] = gh_get(f"{API}/pulls/{PR_NUMBER}/files?per_page=100")

# Build a unified patch text (truncated for token safety)
patches = []
for f in files:
    patch = f.get("patch") or ""
    if not patch:
        continue
    patches.append(f"--- a/{f['filename']}\n+++ b/{f['filename']}\n{patch}")

unified_diff = "\n\n".join(patches)
truncated = False
if len(unified_diff) > MAX_PATCH_CHARS:
    unified_diff = unified_diff[:MAX_PATCH_CHARS] + "\n... [diff truncated for POC]"
    truncated = True

# Prepare prompt
repo_info = textwrap.dedent(f"""
Repository: {REPO}
PR #{PR_NUMBER}: {pr.get('title')}
Author: {pr.get('user', {}).get('login')}

PR description:
{(pr.get('body') or '(no description)')[:2000]}
""")

# The model will return JSON so we can render clean markdown
system_prompt = (
    "You are a strict senior DevOps and code security reviewer. "
    "Analyze the provided unified diff and PR context. "
    "Focus on: security issues, secrets, IaC/CI-Docker pitfalls, correctness, style, and performance. "
    "Return a concise JSON object with fields: "
    "summary (string), risk (low|medium|high), recommendations (string), "
    "findings (array of objects with: file, lines (string or null), severity (info|warning|error), "
    "rationale, suggestion, and optional snippet). Keep total under 900 words."
)

user_prompt = textwrap.dedent(f"""
{repo_info}
Changed files: {[f['filename'] for f in files]}

Unified diff (context for review):
{unified_diff}
""")

# --- Call Groq (Chat Completions with JSON object mode) -------------------
try:
    from groq import Groq
except Exception:
    raise SystemExit("groq SDK not installed. Ensure requirements.txt is installed.")

client = Groq(api_key=GROQ_API_KEY)

completion = client.chat.completions.create(
    model=GROQ_MODEL,
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ],
    temperature=0,
    response_format={"type": "json_object"},
    max_completion_tokens=1200,
)

content = completion.choices[0].message.content

try:
    data = json.loads(content)
except json.JSONDecodeError:
    data = {
        "summary": content,
        "risk": "unknown",
        "recommendations": "Model returned plain text. Enable JSON mode or check truncation.",
        "findings": [],
    }

# --- Render Markdown ------------------------------------------------------
summary = data.get("summary", "(no summary)")
recommendations = data.get("recommendations", "")
risk = data.get("risk", "unknown")
findings = data.get("findings", [])

lines = []
lines.append("## 🤖 AI PR Review (Groq)")
lines.append(f"**Model:** {GROQ_MODEL}  ")
lines.append(f"**Risk:** `{risk}`  ")
if truncated:
    lines.append("> Note: Diff was truncated to fit token budget in POC mode.")
lines.append("\n### Summary\n" + summary)

if recommendations:
    lines.append("\n### Recommendations\n" + recommendations)

if findings:
    lines.append("\n### Findings")
    for idx, f in enumerate(findings, 1):
        file = f.get("file", "?")
        sev = (f.get("severity") or "info").upper()
        rng = f.get("lines") or ""
        rationale = f.get("rationale") or ""
        suggestion = f.get("suggestion") or ""
        snippet = f.get("snippet") or None
        lines.append(f"\n**{idx}. {sev}** — `{file}` {rng}")
        if rationale:
            lines.append(f"- Why: {rationale}")
        if suggestion:
            lines.append(f"- Suggestion: {suggestion}")
        if snippet:
            lines.append("```diff\n" + snippet[:1000] + "\n```")
else:
    lines.append("\n_No specific issues detected in the changed files._")

body_md = "\n".join(lines)

# Post a single PR comment (issue comment)
comment_url = f"{API}/issues/{PR_NUMBER}/comments"
_ = gh_post(comment_url, {"body": body_md})

print("AI review comment posted successfully.")
