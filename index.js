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
      <title>Node.js Application - Modern & Scalable</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }
        
        /* Header */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .nav {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links a {
          color: white;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        
        .nav-links a:hover {
          opacity: 0.8;
        }
        
        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          animation: float 20s infinite linear;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        .hero-content {
          max-width: 800px;
          z-index: 1;
          position: relative;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          animation: slideInUp 1s ease-out;
        }
        
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: slideInUp 1s ease-out 0.2s both;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideInUp 1s ease-out 0.4s both;
        }
        
        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .btn-primary {
          background: white;
          color: #667eea;
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Features Section */
        .features {
          padding: 5rem 2rem;
          background: #f8fafc;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
        }
        
        .section-title p {
          font-size: 1.2rem;
          color: #718096;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: white;
        }
        
        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1a202c;
        }
        
        .feature-card p {
          color: #718096;
          line-height: 1.7;
        }
        
        /* Stats Section */
        .stats {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .stat-item h3 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .stat-item p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        /* Footer */
        .footer {
          background: #1a202c;
          color: white;
          padding: 3rem 2rem 1rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-section h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .footer-section p,
        .footer-section a {
          color: #a0aec0;
          text-decoration: none;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .footer-section a:hover {
          color: white;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .social-links a {
          width: 40px;
          height: 40px;
          background: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }
        
        .social-links a:hover {
          background: #764ba2;
        }
        
        .footer-bottom {
          border-top: 1px solid #2d3748;
          padding-top: 2rem;
          text-align: center;
          color: #a0aec0;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .nav-links {
            display: none;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <header class="header">
        <nav class="nav">
          <div class="logo">
            🚀
            Node.js App
          </div>
          <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="hero" id="home">
        <div class="hero-content">
          <h1>🚀 Modern Node.js Application</h1>
          <p>A powerful, scalable, and modern web application built with Node.js, deployed with GitLab CI/CD & Docker containerization for seamless development and production environments.</p>
          <div class="cta-buttons">
            <a href="#features" class="btn btn-primary">
              ▶️
              Explore Features
            </a>
            <a href="#about" class="btn btn-secondary">
              ℹ️
              Learn More
            </a>
          </div>
          <div class="status-badge">
            <div class="status-dot"></div>
            Server Status: Running Successfully
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" id="features">
        <div class="container">
          <div class="section-title">
            <h2>Powerful Features</h2>
            <p>Built with modern technologies and best practices for optimal performance</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                🖥️
              </div>
              <h3>High Performance</h3>
              <p>Optimized Node.js server with efficient request handling and minimal response times for the best user experience.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                🐳
              </div>
              <h3>Docker Ready</h3>
              <p>Containerized application ready for deployment across any environment with Docker support.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                ☁️
              </div>
              <h3>CI/CD Pipeline</h3>
              <p>Automated deployment pipeline with GitLab CI/CD for seamless integration and continuous delivery.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                📱
              </div>
              <h3>Responsive Design</h3>
              <p>Mobile-first responsive design that works perfectly on all devices and screen sizes.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                🛡️
              </div>
              <h3>Security First</h3>
              <p>Built with security best practices and modern web standards to protect your application.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                ⚡
              </div>
              <h3>Lightning Fast</h3>
              <p>Optimized for speed with efficient caching, compression, and minimal resource usage.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <h3>99.9%</h3>
              <p>Uptime Reliability</p>
            </div>
            <div class="stat-item">
              <h3>&lt;100ms</h3>
              <p>Response Time</p>
            </div>
            <div class="stat-item">
              <h3>24/7</h3>
              <p>Monitoring</p>
            </div>
            <div class="stat-item">
              <h3>∞</h3>
              <p>Scalability</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer" id="contact">
        <div class="footer-content">
          <div class="footer-section">
            <h3>About This App</h3>
            <p>A modern Node.js application showcasing best practices in web development, containerization, and CI/CD deployment.</p>
            <div class="social-links">
              <a href="#">📦</a>
              <a href="#">🐳</a>
              <a href="#">🦊</a>
              <a href="#">⬢</a>
            </div>
          </div>
          <div class="footer-section">
            <h3>Technologies</h3>
            <a href="#">Node.js</a>
            <a href="#">Express.js</a>
            <a href="#">Docker</a>
            <a href="#">GitLab CI/CD</a>
          </div>
          <div class="footer-section">
            <h3>Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">API Reference</a>
            <a href="#">Support</a>
            <a href="#">Contributing</a>
          </div>
          <div class="footer-section">
            <h3>Contact</h3>
            <p>Get in touch for support or collaboration opportunities.</p>
            <a href="mailto:info@nodeapp.com">info@nodeapp.com</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Node.js Application. Built with ❤️ and modern web technologies.</p>
        </div>
      </footer>
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
