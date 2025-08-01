'use client';
import React from 'react';
import CartoonButton from './CartoonButton';

const HERO_WIDTH = 1200;
const HERO_HEIGHT = 500;

const HeroSection: React.FC = () => (
  <section className="relative w-full flex flex-col items-center justify-center py-12 sm:py-20 overflow-hidden">
    {/* Cartoon-style background doodles */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${HERO_WIDTH} ${HERO_HEIGHT}`}
        className="absolute left-0 top-0"
        style={{zIndex:0}}
        preserveAspectRatio="none"
      >
        {/* Top left floating box */}
        <rect x="20" y="20" width="40" height="40" rx="10" fill="#fff" stroke="#000" strokeWidth="3" opacity="0.10"/>
        {/* Top right floating box */}
        <rect x="1140" y="30" width="28" height="28" rx="8" fill="#fff" stroke="#000" strokeWidth="3" opacity="0.10"/>
        {/* Bottom left chat bubble */}
        <ellipse cx="60" cy="470" rx="24" ry="14" fill="#fff" stroke="#000" strokeWidth="3" opacity="0.10"/>
        {/* Left code bracket - vertically centered with headline */}
        <text x="0" y="260" fontSize="56" fontFamily="monospace" fill="#000" opacity="0.15">{'{'}</text>
        {/* Right code bracket - vertically centered with headline */}
        <text x="1150" y="260" fontSize="56" fontFamily="monospace" fill="#000" opacity="0.15">{'}'}</text>
        {/* Stick-figure student and thought bubble, bottom right */}
        <g opacity="0.12">
          {/* Stick-figure */}
          <circle cx="1100" cy="440" r="10" fill="#fff" stroke="#000" strokeWidth="3"/>
          <line x1="1100" y1="450" x2="1100" y2="470" stroke="#000" strokeWidth="3"/>
          <line x1="1100" y1="470" x2="1090" y2="480" stroke="#000" strokeWidth="3"/>
          <line x1="1100" y1="470" x2="1110" y2="480" stroke="#000" strokeWidth="3"/>
          {/* Pencil */}
          <rect x="1105" y="455" width="5" height="16" fill="#fff" stroke="#000" strokeWidth="3" transform="rotate(-20 1105 455)"/>
          {/* Thought bubble */}
          <ellipse cx="1150" cy="420" rx="14" ry="8" fill="#fff" stroke="#000" strokeWidth="3"/>
          <text x="1137" y="425" fontSize="10" fontFamily="Fredoka One, Arial, sans-serif" fill="#000">I can do this!</text>
        </g>
      </svg>
    </div>
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold cartoon-outline mb-6 leading-tight">
        Go Beyond Marks. Learn. Grow. Become You.
      </h1>
      <p className="text-lg sm:text-xl font-semibold mb-8 max-w-xl cartoon-outline text-black/80">
        An AI-powered platform for skills, confidence, and real progress. No more rote memorization.
      </p>
      <CartoonButton className="text-2xl px-10 py-4">Get Started</CartoonButton>
    </div>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px #000;
        color: #fff;
      }
    `}</style>
  </section>
);

export default HeroSection; 