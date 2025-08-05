'use client';
import React from 'react';

const links = [
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms', href: '#' },
];

const CartoonFooter: React.FC = () => (
  <footer className="w-full border-t-4 border-[var(--lemonade-3)] bg-[var(--lemonade-1)] py-6 flex flex-col items-center cartoon-footer">
    <nav className="flex flex-wrap gap-6 mb-4">
      {links.map(link => (
        <a key={link.name} href={link.href} className="font-bold text-[var(--lemonade-3)] cartoon-outline hover:underline focus:underline text-lg" tabIndex={0}>{link.name}</a>
      ))}
    </nav>
    <div className="flex gap-4 mb-4">
      {/* Social icons: X (Twitter), LinkedIn, GitHub, Instagram - accurate brand shapes */}
      <a href="https://x.com/" aria-label="X (Twitter)" className="cartoon-social-icon" tabIndex={0} target="_blank" rel="noopener noreferrer">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="14" ry="14" fill="var(--lemonade-2)"/><path d="M10 10l12 12M22 10l-12 12" stroke="var(--lemonade-3)" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 22L22 10" stroke="var(--lemonade-3)" strokeWidth="2.5" strokeLinecap="round"/></svg>
      </a>
      <a href="https://linkedin.com/" aria-label="LinkedIn" className="cartoon-social-icon" tabIndex={0} target="_blank" rel="noopener noreferrer">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="14" ry="14" fill="var(--lemonade-2)"/><rect x="10" y="13" width="3" height="9" fill="var(--lemonade-3)"/><rect x="15" y="13" width="3" height="9" fill="var(--lemonade-3)"/><rect x="20" y="13" width="3" height="9" fill="var(--lemonade-3)"/><circle cx="11.5" cy="11" r="1.5" fill="var(--lemonade-3)"/></svg>
      </a>
      <a href="https://github.com/" aria-label="GitHub" className="cartoon-social-icon" tabIndex={0} target="_blank" rel="noopener noreferrer">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="14" ry="14" fill="var(--lemonade-2)"/><path d="M20.5 25c0-1.5-1-2-2.5-2s-2.5.5-2.5 2" stroke="var(--lemonade-3)" strokeWidth="2" strokeLinecap="round"/><path d="M12 20c-1-2-1-5 2-7 2-1.5 4-1.5 6 0 3 2 3 5 2 7" stroke="var(--lemonade-3)" strokeWidth="2"/><circle cx="16" cy="16" r="3" fill="var(--lemonade-3)"/></svg>
      </a>
      <a href="https://instagram.com/" aria-label="Instagram" className="cartoon-social-icon" tabIndex={0} target="_blank" rel="noopener noreferrer">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="14" ry="14" fill="var(--lemonade-2)"/><rect x="10" y="10" width="12" height="12" rx="4" fill="var(--lemonade-2)" stroke="var(--lemonade-3)" strokeWidth="2"/><circle cx="22" cy="12" r="1.5" fill="var(--lemonade-3)"/><rect x="14" y="14" width="4" height="4" rx="2" fill="var(--lemonade-3)"/></svg>
      </a>
    </div>
    <div className="font-bold text-lg cartoon-outline flex items-center gap-2 text-[var(--lemonade-3)]">
      Thanks for visiting <span className="text-[var(--lemonade-4)]">Beyond</span><span className="text-[var(--lemonade-2)]">Marks</span>!
      <span aria-label="waving hand" role="img">👋</span>
    </div>
    <style jsx>{`
      .cartoon-outline {
         color: var(--lemonade-5);
        }
      .cartoon-footer {
        box-shadow: 0 -4px 0 0 var(--lemonade-3);
      }
      .cartoon-social-icon svg {
        transition: fill 0.15s, background 0.15s;
      }
      .cartoon-social-icon:hover svg ellipse,
      .cartoon-social-icon:focus svg ellipse {
        fill: var(--lemonade-3);
      }
      .cartoon-social-icon:hover svg path,
      .cartoon-social-icon:focus svg path,
      .cartoon-social-icon:hover svg rect,
      .cartoon-social-icon:focus svg rect {
        stroke: var(--lemonade-1);
      }
    `}</style>
  </footer>
);

export default CartoonFooter; 