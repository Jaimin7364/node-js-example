const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Example endpoint
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Node.js App with Copilot Agent Demo</h1>
    <p>This app is deployed on <b>Render</b> and fixed using <b>GitHub Copilot Agent</b>.</p>
    <p>✅ Status: Running Successfully</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
