'use client';
import React from 'react';

const SidebarWidgets: React.FC = () => {
  const topUsers = [
    { name: 'Sarah Chen', level: 15, xp: 2840, avatar: '👩‍💻' },
    { name: 'Mike Johnson', level: 12, xp: 2150, avatar: '👨‍💻' },
    { name: 'Emma Wilson', level: 10, xp: 1890, avatar: '👩‍🎨' }
  ];

  const topContributors = [
    { name: 'Alex Rivera', answers: 47, avatar: '👨‍🔬' },
    { name: 'Lisa Park', answers: 32, avatar: '👩‍🔧' },
    { name: 'David Kim', answers: 28, avatar: '👨‍🎯' }
  ];

  return (
    <div className="space-y-6">
      {/* Start a Post Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">Start a Post</h3>
        <div className="space-y-3">
          <button className="w-full py-4 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
            ❓ Ask a Question
          </button>
          <button className="w-full py-4 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
            🎨 Share a Project
          </button>
        </div>
      </div>

      {/* Leaderboard Snapshot Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">🏆 Top 3 This Week</h3>
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div key={user.name} className="flex items-center gap-3 p-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div className="w-8 h-8 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">{user.avatar}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--lemonade-3)] text-sm">{user.name}</p>
                  <p className="text-xs text-[var(--lemonade-3)] opacity-80">Level {user.level} • {user.xp} XP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contributors Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">💡 Top Contributors</h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={contributor.name} className="flex items-center gap-3 p-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div className="w-8 h-8 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-[var(--lemonade-3)] font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg">{contributor.avatar}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--lemonade-3)] text-sm">{contributor.name}</p>
                  <p className="text-xs text-[var(--lemonade-3)] opacity-80">{contributor.answers} answers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets; 