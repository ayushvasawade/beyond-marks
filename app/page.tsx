"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="beyondmarks-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon"></span>
            <span className="logo-text">BeyondMarks</span>
          </div>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
            <Link href="/signup" className="nav-link signup-btn">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>BeyondMarks &mdash; <span>Learn. Create. Shine.</span></h1>
          <p className="subtitle">Personalized learning paths, real projects, no grades &mdash; just growth.</p>
          <div className="hero-ctas">
            <Link href="/signup" className="cta primary">Learn HTML/CSS</Link>
            <Link href="/signup" className="cta secondary">Grow Personally</Link>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="info-cards">
        <h2>What You'll Get</h2>
        <div className="cards-grid">
          <div className="info-card">
            <div className="card-icon"></div>
            <h3>AI Tasks</h3>
            <p>Get personalized assignments and challenges powered by AI that adapt to your learning pace.</p>
          </div>
          <div className="info-card">
            <div className="card-icon"></div>
            <h3>XP System</h3>
            <p>Earn experience points and level up as you complete tasks and master new skills.</p>
          </div>
          <div className="info-card">
            <div className="card-icon"></div>
            <h3>Progress Tracking</h3>
            <p>Visualize your learning journey with detailed analytics and achievement badges.</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features">
        <h2>Why BeyondMarks?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span></span>
            <h3>Real-world Tasks</h3>
            <p>Build actual projects that you can showcase in your portfolio</p>
          </div>
          <div className="feature-card">
            <span></span>
            <h3>Smart Learning</h3>
            <p>AI-powered curriculum that adapts to your strengths and weaknesses</p>
          </div>
          <div className="feature-card">
            <span></span>
            <h3>AI Tutor</h3>
            <p>Get instant feedback and guidance from our intelligent learning assistant</p>
          </div>
          <div className="feature-card">
            <span></span>
            <h3>Gamified Experience</h3>
            <p>Learn through interactive challenges, quests, and achievement systems</p>
          </div>
          <div className="feature-card">
            <span></span>
            <h3>Certificates</h3>
            <p>Earn recognized certificates as you complete learning paths</p>
          </div>
          <div className="feature-card">
            <span></span>
            <h3>Live Projects</h3>
            <p>Work on real-world projects that solve actual problems</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Sign Up</h3>
            <p>Create your account and choose your learning path</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Learn & Build</h3>
            <p>Complete interactive lessons and build real projects</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Level Up</h3>
            <p>Earn XP, unlock achievements, and track your progress</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <blockquote>&quot;Finally a platform where I feel excited to learn!&quot; <span>&mdash; Student</span></blockquote>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BeyondMarks</h3>
            <p>Empowering students to learn, create, and shine through personalized education.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link href="/signup">Get Started</Link>
            <Link href="#about">About Us</Link>
            <Link href="#contact">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <Link href="#privacy">Privacy Policy</Link>
            <Link href="#terms">Terms of Service</Link>
            <Link href="#cookies">Cookie Policy</Link>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram"></a>
              <a href="#" aria-label="Twitter"></a>
              <a href="#" aria-label="Discord"></a>
              <a href="#" aria-label="LinkedIn"></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BeyondMarks. All rights reserved.</p>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&family=Poppins:wght@700&family=Quicksand:wght@700&display=swap');
        
        .beyondmarks-landing {
          font-family: 'Poppins', 'Nunito', 'Quicksand', sans-serif;
          background: var(--color-bg);
          min-height: 100vh;
          color: var(--color-text);
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(35, 39, 47, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-accent);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: var(--color-text);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: var(--color-accent);
        }

        .signup-btn {
          background: linear-gradient(90deg, var(--color-accent2) 0%, var(--color-accent) 100%);
          color: #222;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-weight: 700;
        }

        .signup-btn:hover {
          color: #222;
          transform: translateY(-2px);
        }

        /* Hero Section */
        .hero {
          padding: 8rem 2rem 4rem 2rem;
          text-align: center;
          background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 100%);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero h1 span {
          color: var(--color-accent2);
        }

        .subtitle {
          font-size: 1.3rem;
          margin: 1.5rem 0 2.5rem 0;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .hero-ctas {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta {
          padding: 1rem 2.5rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-block;
        }

        .cta.primary {
          background: linear-gradient(90deg, var(--color-accent2) 0%, var(--color-accent) 100%);
          color: #222;
          box-shadow: var(--color-shadow);
        }

        .cta.secondary {
          background: transparent;
          color: var(--color-accent);
          border: 2px solid var(--color-accent);
        }

        .cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px 0 rgba(56,189,248,0.25);
        }

        /* Info Cards */
        .info-cards {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-cards h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--color-accent);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .info-card {
          background: var(--color-card);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--color-shadow);
          transition: transform 0.3s;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .info-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-accent);
        }

        .info-card p {
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* Features */
        .features {
          padding: 4rem 2rem;
          background: var(--color-bg-alt);
        }

        .features h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--color-accent);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: var(--color-card);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--color-shadow);
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-card span {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--color-accent);
        }

        .feature-card p {
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* How It Works */
        .how-it-works {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .how-it-works h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--color-accent);
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .step {
          background: var(--color-card);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--color-shadow);
        }

        .step-icon {
          background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent2) 100%);
          color: #fff;
          font-weight: 900;
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1rem auto;
        }

        .step h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-accent);
        }

        .step p {
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* Testimonial */
        .testimonial {
          padding: 4rem 2rem;
          text-align: center;
          background: var(--color-bg-alt);
        }

        .testimonial blockquote {
          font-size: 1.5rem;
          color: var(--color-text-muted);
          font-style: italic;
          background: var(--color-card);
          border-radius: 1.5rem;
          padding: 2rem;
          display: inline-block;
          max-width: 600px;
        }

        .testimonial span {
          color: var(--color-accent2);
          font-weight: 700;
        }

        /* Footer */
        .footer {
          background: var(--color-bg-alt);
          padding: 3rem 2rem 1rem 2rem;
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
          color: var(--color-accent);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .footer-section h4 {
          color: var(--color-accent);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .footer-section p {
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .footer-section a {
          display: block;
          color: var(--color-text-muted);
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }

        .footer-section a:hover {
          color: var(--color-accent);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          font-size: 1.5rem;
          color: var(--color-text);
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: var(--color-accent2);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--color-bg);
          color: var(--color-text-muted);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 1rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-ctas {
            flex-direction: column;
            align-items: center;
          }

          .cta {
            width: 100%;
            max-width: 300px;
            text-align: center;
          }

          .cards-grid,
          .features-grid,
          .steps {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}
