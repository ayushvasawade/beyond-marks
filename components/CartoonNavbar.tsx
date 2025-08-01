'use client';

import { SignInButton } from '@clerk/nextjs';
import React from 'react';
import CartoonButton from './CartoonButton';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'AI Mentor', href: '#ai-mentor' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Community', href: '#community' },
];

const CartoonNavbar: React.FC = () => (
  <nav
    className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-10 border-b-4 border-black bg-white z-10"
    aria-label="Main navigation"
  >
    {/* Logo */}
    <div className="text-3xl sm:text-4xl font-bold text-black select-none cartoon-outline" aria-label="BeyondMarks logo">
      BeyondMarks
    </div>
    {/* Nav Links */}
    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 sm:mt-0 items-center">
      {navLinks.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="relative px-4 py-2 text-lg font-bold text-black rounded-xl transition-all duration-150 cartoon-outline hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
            tabIndex={0}
          >
            <span className="cartoon-bubble-hover">{link.name}</span>
          </a>
        </li>
      ))}
    </ul>
    {/* Single Sign In / Sign Up Button (links to custom sign-in page) */}
    <div className="mt-3 sm:mt-0">
      <a href="/sign-in">
        <CartoonButton>Sign In / Sign Up</CartoonButton>
      </a>
    </div>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px #000;
        color: #fff;
      }
      .cartoon-bubble-hover {
        position: relative;
        z-index: 1;
        transition: box-shadow 0.15s, background 0.15s;
      }
      a:hover .cartoon-bubble-hover, a:focus .cartoon-bubble-hover {
        box-shadow: 0 0 0 4px #000, 0 0 0 8px #fff;
        background: #fff;
        border-radius: 1.2em;
      }
    `}</style>
  </nav>
);

export default CartoonNavbar; 