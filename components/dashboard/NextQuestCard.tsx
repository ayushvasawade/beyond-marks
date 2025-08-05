'use client';
import React from 'react';

const NextQuestCard: React.FC = () => {
  const quest = {
    title: "Build Your First React Component",
    description: "Create a functional component that displays user information. Learn about props, state, and component lifecycle.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    xpReward: 150,
    skills: ["React", "JavaScript", "Components"]
  };

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Quest Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[var(--lemonade-2)] border-3 border-[var(--lemonade-3)] rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚔️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--lemonade-3)]">Your Next Quest</h2>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Ready to continue your journey?</p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-3">{quest.title}</h3>
          <p className="text-[var(--lemonade-3)] mb-4">{quest.description}</p>
          
          {/* Quest Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">🎯</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{quest.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">⏱️</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{quest.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">⭐</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{quest.xpReward} XP</span>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quest.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full text-sm font-semibold text-[var(--lemonade-3)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="flex flex-col justify-center">
          <button className="px-8 py-4 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-2xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
            Start Quest
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextQuestCard; 