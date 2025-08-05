'use client';
import React from 'react';

const DashboardHeader: React.FC = () => {
  const userLevel = 15;
  const currentXP = 1250;
  const xpForNextLevel = 2000;
  const progressPercentage = (currentXP / xpForNextLevel) * 100;

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-16 h-16 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-4)] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-[var(--lemonade-3)]">👤</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[var(--lemonade-4)] border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{userLevel}</span>
            </div>
          </div>
          
          {/* Greeting & Level */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--lemonade-3)]">
              Welcome back, <span className="text-[var(--lemonade-4)]">Coder</span>!
            </h1>
            <p className="text-lg font-semibold text-[var(--lemonade-3)]">
              Level {userLevel} • {currentXP} / {xpForNextLevel} XP
            </p>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="flex-1 sm:max-w-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[var(--lemonade-3)]">Progress to Level {userLevel + 1}</span>
            <span className="text-sm font-bold text-[var(--lemonade-4)]">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-[var(--lemonade-3)] overflow-hidden">
            <div 
              className="h-full bg-[var(--lemonade-2)] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 