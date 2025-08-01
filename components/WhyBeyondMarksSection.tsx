'use client';
import React from 'react';

const reasons = [
  { icon: <svg width="32" height="32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#000" strokeWidth="3"/><text x="16" y="22" textAnchor="middle" fontSize="18" fontFamily="Fredoka One,Arial" fill="#000">★</text></svg>, text: 'Learning That Matters' },
  { icon: <svg width="32" height="32"><rect x="4" y="8" width="24" height="16" rx="6" fill="#fff" stroke="#000" strokeWidth="3"/><text x="16" y="22" textAnchor="middle" fontSize="16" fontFamily="Fredoka One,Arial" fill="#000">U</text></svg>, text: 'Personalized to You' },
  { icon: <svg width="32" height="32"><ellipse cx="16" cy="16" rx="14" ry="10" fill="#fff" stroke="#000" strokeWidth="3"/><text x="16" y="21" textAnchor="middle" fontSize="16" fontFamily="Fredoka One,Arial" fill="#000">🌱</text></svg>, text: 'Holistic Growth' },
  { icon: <svg width="32" height="32"><rect x="6" y="10" width="20" height="12" rx="6" fill="#fff" stroke="#000" strokeWidth="3"/><text x="16" y="21" textAnchor="middle" fontSize="16" fontFamily="Fredoka One,Arial" fill="#000">⚡</text></svg>, text: 'Motivation That Lasts' },
  { icon: <svg width="32" height="32"><ellipse cx="16" cy="16" rx="14" ry="10" fill="#fff" stroke="#000" strokeWidth="3"/><text x="16" y="21" textAnchor="middle" fontSize="16" fontFamily="Fredoka One,Arial" fill="#000">🛡️</text></svg>, text: 'Safe and Supportive' },
];

const WhyBeyondMarksSection: React.FC = () => (
  <section className="w-full max-w-3xl py-12 flex flex-col items-center">
    <div className="relative w-full max-w-2xl bg-white border-4 border-black rounded-3xl p-8 cartoon-speech-bubble">
      <h2 className="text-2xl sm:text-3xl font-bold cartoon-outline mb-6">Why BeyondMarks?</h2>
      <ul className="space-y-4">
        {reasons.map((reason, idx) => (
          <li key={idx} className="flex items-center gap-4 text-lg font-semibold">
            <span aria-hidden>{reason.icon}</span>
            <span>{reason.text}</span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .cartoon-outline {
          -webkit-text-stroke: 2px #000;
          color: #fff;
        }
        .cartoon-speech-bubble {
          position: relative;
        }
        .cartoon-speech-bubble:after {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -24px;
          width: 40px;
          height: 24px;
          background: #fff;
          border-left: 4px solid #000;
          border-bottom: 4px solid #000;
          border-radius: 0 0 0 32px;
        }
      `}</style>
    </div>
  </section>
);

export default WhyBeyondMarksSection; 