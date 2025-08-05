'use client';
import React from 'react';
import Link from 'next/link';

const ProfileHeader: React.FC = () => {
  const user = {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: '👩‍💻',
    level: 15,
    xp: 2840,
    joinDate: 'March 2024',
    bio: 'Passionate web developer learning React and modern JavaScript. Love building interactive user experiences!'
  };

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-8 mb-8 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-4)] rounded-full flex items-center justify-center text-4xl">
              {user.avatar}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--lemonade-4)] border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{user.level}</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-[var(--lemonade-3)] mb-2">{user.name}</h1>
            <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-2">{user.email}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">⭐</span>
                <span className="text-sm font-semibold text-[var(--lemonade-3)]">Level {user.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">🎯</span>
                <span className="text-sm font-semibold text-[var(--lemonade-3)]">{user.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">📅</span>
                <span className="text-sm font-semibold text-[var(--lemonade-3)]">Joined {user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="flex-1">
          <p className="text-[var(--lemonade-3)] leading-relaxed">{user.bio}</p>
        </div>
        
        {/* Sign Out Button */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
              Back to Dashboard
            </button>
          </Link>
          <button className="px-6 py-3 bg-[var(--lemonade-5)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-1)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 