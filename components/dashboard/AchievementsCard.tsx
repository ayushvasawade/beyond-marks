'use client';
import React from 'react';

const AchievementsCard: React.FC = () => {
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first coding challenge",
      icon: "🎯",
      color: "var(--lemonade-2)",
      earned: true,
      date: "2 days ago"
    },
    {
      id: 2,
      name: "React Master",
      description: "Build 10 React components",
      icon: "⚛️",
      color: "var(--lemonade-4)",
      earned: true,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "JavaScript Ninja",
      description: "Solve 50 JavaScript problems",
      icon: "⚡",
      color: "var(--lemonade-2)",
      earned: false,
      progress: 35
    },
    {
      id: 4,
      name: "Community Helper",
      description: "Help 5 other learners",
      icon: "🤝",
      color: "var(--lemonade-4)",
      earned: false,
      progress: 80
    }
  ];

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[var(--lemonade-2)] border-3 border-[var(--lemonade-3)] rounded-xl flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--lemonade-3)]">Recent Achievements</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">Your coding milestones</p>
        </div>
      </div>
      
      {/* Achievements List */}
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`p-3 border-2 rounded-xl transition-all duration-200 ${
              achievement.earned 
                ? 'border-[var(--lemonade-3)] bg-[var(--lemonade-1)]' 
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Badge Icon */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  achievement.earned 
                    ? 'border-[var(--lemonade-3)]' 
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: achievement.earned ? achievement.color : 'var(--lemonade-5)' }}
              >
                <span className="text-lg">{achievement.icon}</span>
              </div>
              
              {/* Achievement Info */}
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${
                  achievement.earned ? 'text-[var(--lemonade-3)]' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </h3>
                <p className={`text-xs ${
                  achievement.earned ? 'text-[var(--lemonade-3)] opacity-80' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <p className="text-xs text-[var(--lemonade-4)] font-semibold">
                    {achievement.date}
                  </p>
                )}
                {!achievement.earned && achievement.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-[var(--lemonade-2)] rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Status Indicator */}
              {achievement.earned && (
                <div className="w-6 h-6 bg-[var(--lemonade-4)] rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard; 