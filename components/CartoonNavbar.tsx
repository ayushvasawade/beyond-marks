'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import React from 'react';
import CartoonButton from './CartoonButton';
import Link from 'next/link';

const signedInLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Quests', href: '/quest' },
  { name: 'Community', href: '/community' },
];

const CartoonNavbar: React.FC = () => (
  <nav
    className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-10 border-b-4 border-[var(--lemonade-3)] bg-[var(--lemonade-1)] z-10"
    aria-label="Main navigation"
  >
    {/* Logo */}
    <Link href="/" className="text-3xl sm:text-4xl font-bold text-[var(--lemonade-3)] select-none cartoon-outline" aria-label="BeyondMarks logo">
      <span className="text-[var(--lemonade-4)]">Beyond</span><span className="text-[var(--lemonade-2)]">Marks</span>
    </Link>
    {/* Nav Links */}
    <SignedIn>
      <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 sm:mt-0 items-center">
        {signedInLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="relative px-4 py-2 text-lg font-bold text-[var(--lemonade-3)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--lemonade-4)] hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150"
              tabIndex={0}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </SignedIn>
    {/* Single Sign In / Sign Up Button (links to custom sign-in page) */}
    <SignedOut>
      <div className="mt-3 sm:mt-0">
        <Link href="/sign-in">
          <CartoonButton>Sign In / Sign Up</CartoonButton>
        </Link>
      </div>
    </SignedOut>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px var(--lemonade-3);
        color: var(--lemonade-1);
      }
    `}</style>
  </nav>
);

export default CartoonNavbar; 