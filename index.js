const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Node App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          color: white;
        }
        .container {
          text-align: center;
        }
        h1 {
          font-size: 3rem;
        }
        p {
          font-size: 1.2rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Welcome to My Node App!</h1>
        <p>Deployed with GitLab CI/CD & Docker</p>
        <p><strong>Status:</strong> Running Successfully 🎉</p>
      </div>
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
