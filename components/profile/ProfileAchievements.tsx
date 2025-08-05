'use client';
import React from 'react';

const ProfileAchievements: React.FC = () => {
  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first quest',
      icon: '👣',
      earned: true,
      date: 'March 15, 2024',
      xp: 50
    },
    {
      id: 2,
      name: 'Speed Learner',
      description: 'Complete 5 quests in a week',
      icon: '⚡',
      earned: true,
      date: 'March 20, 2024',
      xp: 100
    },
    {
      id: 3,
      name: 'JavaScript Master',
      description: 'Complete all JavaScript quests',
      icon: '🟨',
      earned: true,
      date: 'April 5, 2024',
      xp: 200
    },
    {
      id: 4,
      name: 'React Developer',
      description: 'Complete all React quests',
      icon: '⚛️',
      earned: false,
      progress: 3,
      total: 5,
      xp: 300
    },
    {
      id: 5,
      name: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      earned: false,
      progress: 8,
      total: 30,
      xp: 500
    },
    {
      id: 6,
      name: 'Community Helper',
      description: 'Answer 10 questions in the forum',
      icon: '🤝',
      earned: false,
      progress: 7,
      total: 10,
      xp: 150
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const unearnedAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-8">
      {/* Achievement Stats */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">🏆 Achievement Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">{earnedAchievements.length}</div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Achievements Earned</div>
          </div>
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">{achievements.length}</div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Total Available</div>
          </div>
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">✅ Earned Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedAchievements.map((achievement) => (
            <div key={achievement.id} className="p-4 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-bold text-[var(--lemonade-3)]">{achievement.name}</h3>
                  <p className="text-xs text-[var(--lemonade-3)] opacity-80">+{achievement.xp} XP</p>
                </div>
              </div>
              <p className="text-sm text-[var(--lemonade-3)] mb-2">{achievement.description}</p>
              <p className="text-xs text-[var(--lemonade-3)] opacity-60">Earned {achievement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unearned Achievements */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">🎯 In Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unearnedAchievements.map((achievement) => (
            <div key={achievement.id} className="p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl opacity-60">{achievement.icon}</span>
                <div>
                  <h3 className="font-bold text-[var(--lemonade-3)] opacity-80">{achievement.name}</h3>
                  <p className="text-xs text-[var(--lemonade-3)] opacity-60">+{achievement.xp} XP</p>
                </div>
              </div>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">{achievement.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[var(--lemonade-3)] opacity-80">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.total}</span>
                </div>
                <div className="w-full bg-[var(--lemonade-3)] bg-opacity-20 border border-[var(--lemonade-3)] rounded-full h-2">
                  <div 
                    className="bg-[var(--lemonade-4)] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAchievements; 