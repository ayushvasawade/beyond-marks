'use client';
import React, { useState } from 'react';

const SidebarWidgets: React.FC = () => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const topUsers = [
    { 
      name: 'Sarah Chen', 
      level: 15, 
      xp: 2840, 
      avatar: '👩‍💻',
      skills: ['React', 'JavaScript', 'CSS'],
      bio: 'Full-stack developer passionate about creating beautiful user experiences',
      isConnected: false,
      mutualConnections: 3
    },
    { 
      name: 'Mike Johnson', 
      level: 12, 
      xp: 2150, 
      avatar: '👨‍💻',
      skills: ['JavaScript', 'Node.js', 'MongoDB'],
      bio: 'Backend developer with a love for clean code and efficient solutions',
      isConnected: true,
      mutualConnections: 5
    },
    { 
      name: 'Emma Wilson', 
      level: 10, 
      xp: 1890, 
      avatar: '👩‍🎨',
      skills: ['CSS', 'Design', 'UI/UX'],
      bio: 'Frontend designer focused on creating intuitive and accessible interfaces',
      isConnected: false,
      mutualConnections: 2
    }
  ];

  const topContributors = [
    { 
      name: 'Alex Rivera', 
      answers: 47, 
      avatar: '👨‍🔬',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      bio: 'Data scientist helping others learn through clear explanations',
      isConnected: false,
      mutualConnections: 1
    },
    { 
      name: 'Lisa Park', 
      answers: 32, 
      avatar: '👩‍🔧',
      skills: ['React', 'TypeScript', 'Testing'],
      bio: 'Software engineer specializing in React and modern web development',
      isConnected: true,
      mutualConnections: 4
    },
    { 
      name: 'David Kim', 
      answers: 28, 
      avatar: '👨‍🎯',
      skills: ['JavaScript', 'Performance', 'Optimization'],
      bio: 'Performance engineer focused on making the web faster',
      isConnected: false,
      mutualConnections: 0
    }
  ];

  const handleConnect = (user: any) => {
    setSelectedUser(user);
    setShowConnectModal(true);
  };

  const handleSendMessage = (user: any) => {
    // Here you would typically open a messaging interface
    console.log('Opening message to:', user.name);
  };

  const handleViewProfile = (user: any) => {
    // Here you would typically navigate to user profile
    console.log('Viewing profile of:', user.name);
  };

  const renderUserCard = (user: any, index: number, isContributor = false) => (
    <div key={user.name} className="bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl p-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">{user.avatar}</span>
          <div className="flex-1">
            <p className="font-semibold text-[var(--lemonade-3)] text-sm">{user.name}</p>
            <p className="text-xs text-[var(--lemonade-3)] opacity-80">
              {isContributor ? `${user.answers} answers` : `Level ${user.level} • ${user.xp} XP`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Connection Actions */}
      <div className="flex gap-2">
        {user.isConnected ? (
          <button
            onClick={() => handleSendMessage(user)}
            className="flex-1 py-2 px-3 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-white shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
          >
            💬 Message
          </button>
        ) : (
          <button
            onClick={() => handleConnect(user)}
            className="flex-1 py-2 px-3 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-[var(--lemonade-3)] shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
          >
            🤝 Connect
          </button>
        )}
        <button
          onClick={() => handleViewProfile(user)}
          className="py-2 px-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-[var(--lemonade-3)] shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
        >
          👤 Profile
        </button>
      </div>
    </div>
  );

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

      {/* Connect with Members Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">🤝 Connect with Members</h3>
        <div className="space-y-3">
          <button 
            onClick={() => setShowConnectModal(true)}
            className="w-full py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150"
          >
            Find New Connections
          </button>
          <div className="text-sm text-[var(--lemonade-3)] opacity-80 text-center">
            Build your network and collaborate with fellow learners
          </div>
        </div>
      </div>

      {/* Leaderboard Snapshot Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">🏆 Top 3 This Week</h3>
        <div className="space-y-3">
          {topUsers.map((user, index) => renderUserCard(user, index))}
        </div>
      </div>

      {/* Top Contributors Widget */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-4">💡 Top Contributors</h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => renderUserCard(contributor, index, true))}
        </div>
      </div>

      {/* Connection Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 max-w-md w-full mx-4 shadow-[8px_8px_0_0_var(--lemonade-3)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--lemonade-3)]">Connect with Members</h3>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-[var(--lemonade-3)] hover:text-[var(--lemonade-4)] transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-[var(--lemonade-3)] opacity-80">
                Discover and connect with other learners based on your interests and skills.
              </div>
              
              <div className="space-y-3">
                <button className="w-full py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
                  🔍 Browse by Skills
                </button>
                <button className="w-full py-3 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
                  👥 Suggested Connections
                </button>
                <button className="w-full py-3 bg-[var(--lemonade-1)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
                  📍 Nearby Members
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarWidgets; 