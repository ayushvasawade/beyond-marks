'use client';

import React from 'react';
import Link from 'next/link';

const dashboardNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Learning Lab', href: '/learning-lab' },
  { name: 'Quests', href: '/quests' },
  { name: 'Progress', href: '/progress' },
  { name: 'Community', href: '/community' },
  { name: 'Settings', href: '/settings' },
];

const DashboardNavbar: React.FC = () => (
  <nav
    className="w-full flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-10 border-b-4 border-[var(--lemonade-3)] bg-[var(--lemonade-1)] z-10"
    aria-label="Dashboard navigation"
  >
    {/* Logo */}
    <Link href="/dashboard" className="text-3xl sm:text-4xl font-bold text-[var(--lemonade-3)] select-none cartoon-outline" aria-label="BeyondMarks logo">
      <span className="text-[var(--lemonade-4)]">Beyond</span><span className="text-[var(--lemonade-2)]">Marks</span>
    </Link>
    
    {/* Nav Links */}
    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3 sm:mt-0 items-center">
      {dashboardNavLinks.map((link) => (
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
    
    {/* User Profile Section */}
    <div className="mt-3 sm:mt-0 flex items-center gap-4">
      {/* Notifications */}
      <button className="w-10 h-10 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center hover:bg-[var(--lemonade-4)] hover:text-white transition-colors duration-150">
        <span className="text-lg">🔔</span>
      </button>
      
      {/* User Avatar */}
      <Link href="/profile" className="relative">
        <div className="w-10 h-10 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-4)] rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--lemonade-4)] hover:text-white transition-colors duration-150">
          <span className="text-lg font-bold text-[var(--lemonade-3)]">👤</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--lemonade-4)] border-2 border-white rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">15</span>
        </div>
      </Link>
    </div>
    
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px var(--lemonade-3);
        color: var(--lemonade-1);
      }
    `}</style>
  </nav>
);

export default DashboardNavbar; 