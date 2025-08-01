'use client';
import React from 'react';

const links = [
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms', href: '#' },
];

const CartoonFooter: React.FC = () => (
  <footer className="w-full border-t-4 border-black bg-white py-6 flex flex-col items-center cartoon-footer">
    <nav className="flex flex-wrap gap-6 mb-4">
      {links.map(link => (
        <a key={link.name} href={link.href} className="font-bold text-black cartoon-outline hover:underline focus:underline text-lg" tabIndex={0}>{link.name}</a>
      ))}
    </nav>
    <div className="flex gap-4 mb-4">
      {/* Social icons: Twitter, Facebook, Instagram */}
      <a href="#" aria-label="Twitter" className="cartoon-social-icon" tabIndex={0}>
        <svg width="32" height="32" fill="none" stroke="#000" strokeWidth="3"><ellipse cx="16" cy="16" rx="14" ry="14" fill="#fff"/><path d="M10 18c4 2 8-2 12-6" stroke="#000" strokeWidth="2"/><path d="M12 14c2 2 6 6 10 2" stroke="#000" strokeWidth="2"/></svg>
      </a>
      <a href="#" aria-label="Facebook" className="cartoon-social-icon" tabIndex={0}>
        <svg width="32" height="32" fill="none" stroke="#000" strokeWidth="3"><ellipse cx="16" cy="16" rx="14" ry="14" fill="#fff"/><path d="M16 10v12" stroke="#000" strokeWidth="2"/><path d="M12 16h8" stroke="#000" strokeWidth="2"/></svg>
      </a>
      <a href="#" aria-label="Instagram" className="cartoon-social-icon" tabIndex={0}>
        <svg width="32" height="32" fill="none" stroke="#000" strokeWidth="3"><ellipse cx="16" cy="16" rx="14" ry="14" fill="#fff"/><rect x="10" y="10" width="12" height="12" rx="4" fill="#fff" stroke="#000" strokeWidth="2"/></svg>
      </a>
    </div>
    <div className="font-bold text-lg cartoon-outline flex items-center gap-2">
      Thanks for visiting BeyondMarks!
      <span aria-label="waving hand" role="img">👋</span>
    </div>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px #000;
        color: #fff;
      }
      .cartoon-footer {
        box-shadow: 0 -4px 0 0 #000;
      }
      .cartoon-social-icon svg {
        transition: fill 0.15s, background 0.15s;
      }
      .cartoon-social-icon:hover svg ellipse,
      .cartoon-social-icon:focus svg ellipse {
        fill: #000;
      }
      .cartoon-social-icon:hover svg path,
      .cartoon-social-icon:focus svg path,
      .cartoon-social-icon:hover svg rect,
      .cartoon-social-icon:focus svg rect {
        stroke: #fff;
      }
    `}</style>
  </footer>
);

export default CartoonFooter; 