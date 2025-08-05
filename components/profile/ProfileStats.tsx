'use client';
import React from 'react';

const ProfileStats: React.FC = () => {
  const stats = {
    totalQuests: 47,
    completedQuests: 42,
    currentStreak: 8,
    totalXP: 2840,
    rank: 'Gold',
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js']
  };

  const recentActivity = [
    { type: 'quest', title: 'Completed "Build a Todo App"', xp: 150, time: '2 hours ago' },
    { type: 'achievement', title: 'Earned "Speed Learner" badge', xp: 50, time: '1 day ago' },
    { type: 'quest', title: 'Completed "CSS Grid Mastery"', xp: 200, time: '2 days ago' },
    { type: 'achievement', title: 'Reached Level 15', xp: 100, time: '3 days ago' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Learning Progress */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">📊 Learning Progress</h2>
        
        <div className="space-y-6">
          {/* Quest Completion */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[var(--lemonade-3)]">Quest Completion</span>
              <span className="text-sm text-[var(--lemonade-3)] opacity-80">{stats.completedQuests}/{stats.totalQuests}</span>
            </div>
            <div className="w-full bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-full h-4">
              <div 
                className="bg-[var(--lemonade-4)] h-full rounded-full transition-all duration-300"
                style={{ width: `${(stats.completedQuests / stats.totalQuests) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-[var(--lemonade-3)]">Current Streak</p>
                <p className="text-sm text-[var(--lemonade-3)] opacity-80">Keep it going!</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[var(--lemonade-4)]">{stats.currentStreak}</p>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">days</p>
            </div>
          </div>

          {/* Rank */}
          <div className="flex items-center justify-between p-4 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold text-[var(--lemonade-3)]">Current Rank</p>
                <p className="text-sm text-[var(--lemonade-3)] opacity-80">Based on XP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--lemonade-3)]">{stats.rank}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills and Recent Activity */}
      <div className="space-y-6">
        {/* Skills */}
        <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
          <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">🛠️ Skills</h2>
          <div className="flex flex-wrap gap-2">
            {stats.skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-xl text-sm font-semibold text-[var(--lemonade-3)]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
          <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">📝 Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {activity.type === 'quest' ? '✅' : '🏆'}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--lemonade-3)] text-sm">{activity.title}</p>
                    <p className="text-xs text-[var(--lemonade-3)] opacity-80">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--lemonade-4)]">+{activity.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats; 