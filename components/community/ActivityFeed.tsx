'use client';
import React from 'react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'project',
      title: 'Interactive Todo App with React',
      creator: 'Sarah Chen',
      thumbnail: '📱',
      kudos: 24,
      comments: 8,
      tags: ['React', 'JavaScript', 'CSS']
    },
    {
      id: 2,
      type: 'question',
      title: 'How to implement dark mode toggle?',
      user: 'Mike Johnson',
      tags: ['CSS', 'JavaScript'],
      votes: 15,
      answers: 3
    },
    {
      id: 3,
      type: 'announcement',
      title: 'New Learning Path: Full-Stack Development',
      content: 'We\'ve launched a comprehensive learning path covering HTML, CSS, JavaScript, React, and Node.js!',
      isPinned: true
    },
    {
      id: 4,
      type: 'project',
      title: 'Weather Dashboard with API Integration',
      creator: 'Alex Rivera',
      thumbnail: '🌤️',
      kudos: 31,
      comments: 12,
      tags: ['JavaScript', 'API', 'CSS']
    },
    {
      id: 5,
      type: 'question',
      title: 'Best practices for responsive design?',
      user: 'Emma Wilson',
      tags: ['CSS', 'Responsive'],
      votes: 8,
      answers: 5
    }
  ];

  const renderProjectCard = (activity: any) => (
    <div key={activity.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 mb-6 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl flex items-center justify-center text-3xl">
          {activity.thumbnail}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-2">{activity.title}</h3>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">by {activity.creator}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.tags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-[var(--lemonade-2)] border border-[var(--lemonade-3)] rounded-full text-xs font-semibold text-[var(--lemonade-3)]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">👍</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{activity.kudos}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">💬</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{activity.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionCard = (activity: any) => (
    <div key={activity.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 mb-6 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold">
          Q
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-2">{activity.title}</h3>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">asked by {activity.user}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.tags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-[var(--lemonade-1)] border border-[var(--lemonade-3)] rounded-full text-xs font-semibold text-[var(--lemonade-3)]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">⬆️</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{activity.votes}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--lemonade-4)]">💬</span>
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">{activity.answers} answers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnouncementCard = (activity: any) => (
    <div key={activity.id} className="bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-2xl p-6 mb-6 shadow-[4px_4px_0_0_var(--lemonade-3)] relative">
      {activity.isPinned && (
        <div className="absolute -top-2 -left-2 bg-[var(--lemonade-4)] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[var(--lemonade-3)]">
          📌 PINNED
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold">
          🎉
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-2">{activity.title}</h3>
          <p className="text-sm text-[var(--lemonade-3)]">{activity.content}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">Community Activity</h2>
      <div className="space-y-6">
        {activities.map((activity) => {
          switch (activity.type) {
            case 'project':
              return renderProjectCard(activity);
            case 'question':
              return renderQuestionCard(activity);
            case 'announcement':
              return renderAnnouncementCard(activity);
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ActivityFeed; 