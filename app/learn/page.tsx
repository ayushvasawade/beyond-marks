"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function LearnEntryPage() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user?.displayName || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="learn-entry-bg">
      <div className="learn-entry-container">
        <h1 className="welcome-title">
          👋 Welcome{userName ? ` back, ${userName}` : "!"}
        </h1>
        <h2 className="subtitle">What would you like to work on today?</h2>
        <div className="option-cards">
          {/* HTML/CSS Learning Card */}
          <div className="option-card htmlcss-card">
            <div className="option-icon">🧱</div>
            <div className="option-content">
              <h3>HTML/CSS Learning</h3>
              <p>Practice real frontend skills and build your XP.</p>
              <Link href="/learn/htmlcss" className="option-btn htmlcss-btn">
                Start Learning &rarr;
              </Link>
            </div>
          </div>
          {/* Personality Growth Card */}
          <div className="option-card personality-card">
            <div className="option-icon">💬</div>
            <div className="option-content">
              <h3>Personality Growth</h3>
              <p>Improve confidence, creativity, and communication.</p>
              <Link href="/learn/personality" className="option-btn personality-btn">
                Let’s Grow &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Nunito:wght@700&display=swap');
        .learn-entry-bg {
          min-height: 100vh;
          background: var(--color-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', 'Nunito', sans-serif;
        }
        .learn-entry-container {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          background: var(--color-bg-alt);
          border-radius: 2rem;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          padding: 2.5rem 2rem 3rem 2rem;
          text-align: center;
        }
        .welcome-title {
          color: var(--color-accent);
          font-size: 2.1rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: var(--color-text);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
        }
        .option-cards {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .option-card {
          background: #23272f;
          border-radius: 1.5rem;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 2.2rem 2rem 2rem 2rem;
          min-width: 260px;
          max-width: 320px;
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s;
          cursor: pointer;
          border: 2px solid transparent;
          position: relative;
        }
        .option-card:hover {
          transform: translateY(-10px) scale(1.04);
          box-shadow: 0 8px 32px rgba(0,0,0,0.16);
          border-color: var(--color-accent);
        }
        .option-icon {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          transition: transform 0.3s cubic-bezier(.4,2,.6,1);
        }
        .option-card:hover .option-icon {
          transform: scale(1.18) rotate(-8deg);
        }
        .option-content h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--color-accent2);
        }
        .option-content p {
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }
        .option-btn {
          display: inline-block;
          padding: 0.7rem 1.5rem;
          border-radius: 1rem;
          font-weight: 800;
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .htmlcss-btn {
          background: #00bcd4;
          color: #fff;
        }
        .htmlcss-btn:hover {
          background: #0097a7;
        }
        .personality-btn {
          background: #ffeb3b;
          color: #222;
        }
        .personality-btn:hover {
          background: #ffe082;
        }
        @media (max-width: 700px) {
          .option-cards {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
} 