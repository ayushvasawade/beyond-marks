"use client";
import React, { useState } from "react";

export default function HTMLCSSPage() {
  const [html, setHtml] = useState("<h1>Hello, world!</h1>");
  const [css, setCss] = useState("h1 { color: #00bcd4; text-align: center; }");

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>
  `;

  return (
    <main className="learn-bg">
      <div className="learn-container">
        <h1 className="learn-title">HTML & CSS Playground</h1>
        <div className="learn-grid">
          {/* Code Editor Section */}
          <section className="editor-section">
            <h2>✍️ Write Your Code</h2>
            <label>HTML</label>
            <textarea
              className="code-editor html-editor"
              value={html}
              onChange={e => setHtml(e.target.value)}
              rows={8}
              spellCheck={false}
            />
            <label>CSS</label>
            <textarea
              className="code-editor css-editor"
              value={css}
              onChange={e => setCss(e.target.value)}
              rows={6}
              spellCheck={false}
            />
          </section>

          {/* Output Section */}
          <section className="output-section">
            <h2>👀 Output</h2>
            <iframe
              className="output-frame"
              srcDoc={srcDoc}
              title="Output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="250"
            />
          </section>

          {/* AI Suggestion Section */}
          <section className="ai-section">
            <h2>🤖 AI Suggestion</h2>
            <div className="ai-placeholder">
              <p>AI tips and suggestions will appear here soon!</p>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .learn-bg {
          min-height: 100vh;
          background: var(--color-bg);
          font-family: 'Poppins', 'Nunito', sans-serif;
          padding: 2rem 0;
        }
        .learn-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--color-bg-alt);
          border-radius: 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .learn-title {
          text-align: center;
          color: var(--color-accent);
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 2rem;
        }
        .learn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
        }
        .editor-section, .output-section, .ai-section {
          background: #23272f;
          border-radius: 1.5rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
        }
        .editor-section label {
          font-weight: 700;
          margin-top: 1rem;
          color: var(--color-accent2);
        }
        .code-editor {
          width: 100%;
          font-family: 'Fira Mono', 'Consolas', monospace;
          font-size: 1rem;
          background: #181b20;
          color: #fff;
          border: 1px solid #333;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          resize: vertical;
        }
        .output-section {
          align-items: center;
        }
        .output-frame {
          width: 100%;
          min-height: 200px;
          background: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-top: 1rem;
        }
        .ai-section {
          align-items: center;
          justify-content: center;
        }
        .ai-placeholder {
          background: #181b20;
          color: #aaa;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          margin-top: 1rem;
        }
        @media (max-width: 900px) {
          .learn-grid {
            grid-template-columns: 1fr;
          }
          .editor-section, .output-section, .ai-section {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </main>
  );
} 