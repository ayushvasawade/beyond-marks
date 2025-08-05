'use client';
import React from 'react';

const CommunityCard: React.FC = () => {
  const communityActivities = [
    {
      id: 1,
      user: "Sarah_Coder",
      action: "just earned the React Master badge! 🎉",
      time: "2 min ago",
      avatar: "👩‍💻"
    },
    {
      id: 2,
      user: "MikeDev",
      action: "completed 'Build Your First API' quest",
      time: "15 min ago",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      user: "CodeNinja",
      action: "helped 3 learners in the JavaScript forum",
      time: "1 hour ago",
      avatar: "🦸‍♂️"
    },
    {
      id: 4,
      user: "WebWizard",
      action: "reached Level 25! 🚀",
      time: "2 hours ago",
      avatar: "🧙‍♂️"
    }
  ];

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[var(--lemonade-2)] border-3 border-[var(--lemonade-3)] rounded-xl flex items-center justify-center">
          <span className="text-2xl">👥</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--lemonade-3)]">Community Buzz</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">What's happening in your community</p>
        </div>
      </div>
      
      {/* Community Activities */}
      <div className="space-y-3">
        {communityActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            {/* User Avatar */}
            <div className="w-8 h-8 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm">{activity.avatar}</span>
            </div>
            
            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--lemonade-3)]">
                <span className="font-semibold text-[var(--lemonade-4)] cursor-pointer hover:underline">
                  {activity.user}
                </span>
                {" "}{activity.action}
              </p>
              <p className="text-xs text-[var(--lemonade-3)] opacity-60 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t-2 border-[var(--lemonade-3)]">
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-lg text-white text-sm font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
            Join Forum
          </button>
          <button className="px-3 py-2 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-lg text-[var(--lemonade-3)] text-sm font-semibold hover:bg-[var(--lemonade-4)] hover:text-white transition-colors duration-150">
            Share Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard; 