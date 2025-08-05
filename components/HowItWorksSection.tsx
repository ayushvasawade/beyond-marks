'use client';
import React from 'react';

const steps = [
  { label: 'Sign Up', icon: <svg width="40" height="40"><circle cx="20" cy="20" r="18" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="4"/><text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-gluten),Arial" fill="var(--lemonade-3)">1</text></svg> },
  { label: 'Set Your Goals', icon: <svg width="40" height="40"><rect x="6" y="10" width="28" height="20" rx="10" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="4"/><text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-gluten),Arial" fill="var(--lemonade-3)">2</text></svg> },
  { label: 'Learn & Practice', icon: <svg width="40" height="40"><ellipse cx="20" cy="20" rx="18" ry="12" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="4"/><text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-gluten),Arial" fill="var(--lemonade-3)">3</text></svg> },
  { label: 'Track Progress', icon: <svg width="40" height="40"><rect x="8" y="14" width="24" height="12" rx="6" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="4"/><text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-gluten),Arial" fill="var(--lemonade-3)">4</text></svg> },
  { label: 'Celebrate', icon: <svg width="40" height="40"><ellipse cx="20" cy="20" rx="18" ry="12" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="4"/><text x="20" y="27" textAnchor="middle" fontSize="20" fontFamily="var(--font-gluten),Arial" fill="var(--lemonade-3)">🎉</text></svg> },
];

const HowItWorksSection: React.FC = () => (
  <section className="w-full max-w-4xl py-16 flex flex-col items-center">
    <h2 className="text-2xl sm:text-3xl font-bold cartoon-outline mb-12 text-[var(--lemonade-3)]">How It Works</h2>
    <div className="relative w-full flex flex-col items-center">
      {/* Straight timeline SVG */}
      <svg className="hidden sm:block absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0" width="100%" height="80" viewBox="0 0 900 80" fill="none" preserveAspectRatio="none">
        <line x1="50" y1="40" x2="850" y2="40" stroke="var(--lemonade-3)" strokeWidth="4" strokeDasharray="8,8"/>
      </svg>
      <div className="flex flex-col sm:flex-row w-full justify-between items-center relative z-10">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className="flex flex-col items-center sm:mb-0 sm:mx-0 sm:w-1/5 relative"
            style={{ zIndex: 2 }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 bg-[var(--lemonade-1)] p-2 rounded-full border-4 border-[var(--lemonade-3)]" aria-hidden>{step.icon}</div>
              <span className="font-bold text-lg cartoon-outline text-center whitespace-nowrap mt-1 text-[var(--lemonade-3)]">{step.label}</span>
            </div>
            {/* Connector dot for mobile */}
            {idx < steps.length - 1 && (
              <svg className="sm:hidden" width="4" height="32"><circle cx="2" cy="16" r="2" fill="var(--lemonade-3)"/></svg>
            )}
          </div>
        ))}
      </div>
      {/* Mobile vertical line */}
      <svg className="sm:hidden absolute left-1/2 -translate-x-1/2 top-16 bottom-16 z-0" width="4" height="100%" viewBox="0 0 4 400" preserveAspectRatio="none">
        <line x1="2" y1="0" x2="2" y2="400" stroke="var(--lemonade-3)" strokeWidth="4" strokeDasharray="8,8"/>
      </svg>
    </div>
    <style jsx>{`
     .cartoon-outline {
         color: var(--lemonade-5);
        }
    `}</style>
  </section>
);

export default HowItWorksSection; 