'use client';
import React from 'react';
import FeaturePanel from './FeaturePanel';

const features = [
  {
    title: 'AI Mentor',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="18" ry="16" fill="#fff" stroke="#000" strokeWidth="4"/><ellipse cx="18" cy="22" rx="2.5" ry="3.5" fill="#000"/><ellipse cx="30" cy="22" rx="2.5" ry="3.5" fill="#000"/><path d="M18 32c2 2 8 2 12 0" stroke="#000" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'Gamified Progress',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="32" height="16" rx="8" fill="#fff" stroke="#000" strokeWidth="4"/><rect x="20" y="12" width="8" height="16" rx="4" fill="#fff" stroke="#000" strokeWidth="4"/><rect x="28" y="8" width="8" height="20" rx="4" fill="#fff" stroke="#000" strokeWidth="4"/></svg>
    ),
  },
  {
    title: 'Community Support',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><ellipse cx="16" cy="28" rx="8" ry="8" fill="#fff" stroke="#000" strokeWidth="4"/><ellipse cx="32" cy="28" rx="8" ry="8" fill="#fff" stroke="#000" strokeWidth="4"/><ellipse cx="24" cy="16" rx="8" ry="8" fill="#fff" stroke="#000" strokeWidth="4"/></svg>
    ),
  },
  {
    title: 'Personalized Learning',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="24" rx="8" fill="#fff" stroke="#000" strokeWidth="4"/><path d="M16 20h16M16 28h8" stroke="#000" strokeWidth="3" strokeLinecap="round"/></svg>
    ),
  },
];

const FeaturesSection: React.FC = () => (
  <section id="features" className="w-full max-w-5xl py-12 flex flex-col items-center">
    <h2 className="text-3xl sm:text-4xl font-bold cartoon-outline mb-10">Features</h2>
    <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
      {features.map((feature) => (
        <FeaturePanel key={feature.title} icon={feature.icon} title={feature.title} />
      ))}
    </div>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px #000;
        color: #fff;
      }
    `}</style>
  </section>
);

export default FeaturesSection; 