import os
"""
)

# --- Call Groq (Chat Completions with JSON object mode) -------------------
try:
    from groq import Groq
except Exception as e:
    raise SystemExit("groq SDK not installed. Ensure requirements.txt is installed.")

client = Groq(api_key=GROQ_API_KEY)

completion = client.chat.completions.create(
    model=GROQ_MODEL,
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ],
    temperature=0,
    # Ask Groq to emit a valid JSON object
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
