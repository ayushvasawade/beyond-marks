"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import ClientOnly from "../components/ClientOnly";

function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="learn-bg">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your learning journey...</p>
        </div>
        <style jsx>{`
          .learn-bg {
            min-height: 100vh;
            background: var(--color-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
          }
          .loading {
            text-align: center;
            color: var(--color-text);
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--color-bg-alt);
            border-top: 4px solid var(--color-accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="learn-bg">
        <div className="not-logged-in">
          <h2>Please log in to view your learning dashboard</h2>
          <Link href="/login" className="login-link">Go to Login</Link>
        </div>
        <style jsx>{`
          .learn-bg {
            min-height: 100vh;
            background: var(--color-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Poppins', sans-serif;
          }
          .not-logged-in {
            text-align: center;
            color: var(--color-text);
          }
          .not-logged-in h2 {
            margin-bottom: 1rem;
          }
          .login-link {
            color: var(--color-accent);
            text-decoration: none;
            font-weight: 700;
          }
        `}</style>
      </main>
    );
  }

  const handleNavigate = () => {
    console.log('Navigating to /htmlcss...');
    router.push('/htmlcss');
  };

  const handleTestNavigate = () => {
    console.log('Testing direct navigation...');
    window.open('/htmlcss', '_self');
  };

  return (
    <main className="learn-bg">
      {/* Header/Navbar */}
      <nav className="header-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🚀</span>
            <span className="brand-text">BeyondMarks</span>
          </div>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/community" className="nav-link">Community</Link>
            <Link href="/mentor-chat" className="nav-link">AI Mentor</Link>
            <Link href="/profile" className="nav-link">Profile</Link>
            <button className="nav-link logout-btn">Logout</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-animation">
          <div className="particle particle1"></div>
          <div className="particle particle2"></div>
          <div className="particle particle3"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-greeting">
            Hi, {user.displayName?.split(' ')[0] || 'Student'}! Ready to grow today?
          </h1>
          <p className="hero-quote">"Learning is not about marks, it's about growth. Go Beyond!"</p>
        </div>
      </section>

      {/* Choose Your Growth Path */}
      <section className="growth-section">
        <h2 className="section-title">Choose Your Growth Path</h2>
        <div className="growth-cards">
          {/* HTML/CSS Learning Card - Make entire card clickable */}
          <Link href="/learn/htmlcss" className="growth-card htmlcss-card card-link" style={{ textDecoration: 'none' }}>
            <div className="card-icon" aria-label="HTML/CSS">&lt;/&gt;</div>
            <h3 className="card-title">HTML/CSS Learning</h3>
            <p className="card-subtitle">Practice real frontend skills and build your XP</p>
            <span className="card-btn htmlcss-btn">Start Learning</span>
          </Link>
          {/* Personality Growth - Make entire card clickable */}
          <Link href="/learn/personality" className="growth-card personality-card card-link" style={{ textDecoration: 'none' }}>
            <div className="card-icon"></div>
            <h3 className="card-title">Personality Growth</h3>
            <p className="card-subtitle">Boost confidence, creativity, and communication</p>
            <span className="card-btn personality-btn">Start Growing</span>
          </Link>
        </div>
      </section>

      {/* Community & AI Section */}
      <section className="community-ai-section">
        <div className="section-grid">
          {/* Community Hub Card */}
          <div className="feature-card community-card">
            <div className="feature-icon"></div>
            <h3 className="feature-title">Community Hub</h3>
            <p className="feature-description">Connect with fellow learners, ask questions, and share knowledge in a supportive environment</p>
            <Link href="/community" className="feature-btn community-btn">
              Join Community
            </Link>
          </div>

          {/* AI Mentor Card */}
          <div className="feature-card mentor-card">
            <div className="feature-icon"></div>
            <h3 className="feature-title">AI Mentor</h3>
            <p className="feature-description">Your personalized learning companion. Get guidance, motivation, and answers to your questions</p>
            <Link href="/mentor-chat" className="feature-btn mentor-btn">
              Chat with AI
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link href="/contact" className="footer-link">Contact</Link>
          <Link href="/about" className="footer-link">About Us</Link>
          <Link href="/github" className="footer-link">GitHub</Link>
          <Link href="/privacy" className="footer-link">Privacy</Link>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Nunito:wght@400;600;700&display=swap');
        
        .learn-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Poppins', 'Nunito', sans-serif;
          color: var(--color-text);
        }

        /* Header/Navbar */
        .header-nav {
          position: sticky;
          top: 0;
          background: rgba(15, 20, 25, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 900;
          color: #00bcd4;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: var(--color-text);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          padding: 0.5rem 1rem;
          border-radius: 0.8rem;
        }

        .nav-link:hover {
          color: #00bcd4;
          background: rgba(0, 188, 212, 0.1);
        }

        .logout-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #ff6b6b;
        }

        .logout-btn:hover {
          color: #ff8e53;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          overflow: hidden;
        }

        .hero-bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          filter: blur(2px);
          animation: float 6s ease-in-out infinite;
        }

        .particle1 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #00bcd4, #ffeb3b);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle2 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ff6b6b, #00bcd4);
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .particle3 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #ffeb3b, #ff6b6b);
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
        }

        .hero-greeting {
          font-size: 2.5rem;
          font-weight: 900;
          color: #00bcd4;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-quote {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-style: italic;
        }

        /* Growth Section */
        .growth-section {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 900;
          color: #00bcd4;
          margin-bottom: 3rem;
        }

        .growth-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          justify-items: center;
        }

        .growth-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
          width: 100%;
          max-width: 400px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .growth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(255, 235, 59, 0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .growth-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 188, 212, 0.2);
        }

        .growth-card:hover::before {
          opacity: 1;
        }

        .card-link {
          text-decoration: none;
          color: inherit;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #00bcd4;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .card-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .card-btn {
          display: inline-block;
          padding: 0.8rem 2rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .htmlcss-btn {
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          color: white;
        }

        .htmlcss-btn:hover {
          background: linear-gradient(135deg, #0097a7, #00695c);
          transform: scale(1.05);
        }

        .personality-btn {
          background: linear-gradient(135deg, #ffeb3b, #ffc107);
          color: #222;
        }

        .personality-btn:hover {
          background: linear-gradient(135deg, #ffc107, #ff9800);
          transform: scale(1.05);
        }

        .redirect-btn {
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          color: white;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.3s;
        }
        .redirect-btn:hover {
          background: linear-gradient(135deg, #0097a7, #00695c);
          transform: scale(1.05);
        }

        .test-btn {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.3s;
        }
        .test-btn:hover {
          background: linear-gradient(135deg, #ff8e53, #ff6b6b);
          transform: scale(1.05);
        }

        /* Community & AI Section */
        .community-ai-section {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          text-align: center;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 188, 212, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .community-card {
          border-color: rgba(255, 193, 7, 0.3);
        }

        .community-card:hover {
          border-color: rgba(255, 193, 7, 0.5);
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2);
        }

        .mentor-card {
          border-color: rgba(0, 188, 212, 0.3);
        }

        .mentor-card:hover {
          border-color: rgba(0, 188, 212, 0.5);
          box-shadow: 0 10px 30px rgba(0, 188, 212, 0.2);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .feature-description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .feature-btn {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }

        .community-btn {
          background: linear-gradient(135deg, #ffc107, #ff9800);
          color: #0f1419;
        }

        .community-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
        }

        .mentor-btn {
          background: linear-gradient(135deg, #00bcd4, #64ffda);
          color: #0f1419;
        }

        .mentor-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
        }

        /* Footer */
        .footer {
          background: rgba(15, 20, 25, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
          margin-top: 3rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: #00bcd4;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1rem;
          }
          
          .nav-links {
            gap: 1rem;
          }

          .hero-greeting {
            font-size: 2rem;
          }

          .hero-quote {
            font-size: 1.1rem;
          }

          .growth-cards {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .growth-card {
            padding: 2rem;
          }

          .footer-links {
            gap: 1rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-section {
            padding: 2rem 1rem;
          }

          .growth-section,
          .community-ai-section {
            padding: 2rem 1rem;
          }

          .section-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

export default function Dashboard() {
  return (
    <ClientOnly>
      <DashboardContent />
    </ClientOnly>
  );
}
