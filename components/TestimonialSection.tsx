'use client';
import React from 'react';

const TestimonialSection: React.FC = () => (
  <section className="w-full max-w-2xl py-12 flex flex-col items-center">
    <div className="relative w-full max-w-xl bg-white border-4 border-black rounded-3xl p-8 cartoon-speech-bubble">
      <div className="flex items-center gap-4 mb-4">
        {/* Cartoon student avatar */}
        <svg width="48" height="48"><circle cx="24" cy="20" r="12" fill="#fff" stroke="#000" strokeWidth="4"/><ellipse cx="24" cy="38" rx="14" ry="8" fill="#fff" stroke="#000" strokeWidth="4"/></svg>
        <span className="font-bold text-lg cartoon-outline">Student</span>
      </div>
      <blockquote className="text-xl font-semibold cartoon-outline">"I used to get bored in class. Now learning is actually fun!"</blockquote>
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

export default TestimonialSection; 