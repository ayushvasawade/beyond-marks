'use client';
import React, { useState } from 'react';

const MemberConnections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connections' | 'discover' | 'messages'>('connections');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const connections = [
    {
      id: 1,
      name: 'Mike Johnson',
      avatar: '👨‍💻',
      level: 12,
      skills: ['JavaScript', 'Node.js', 'MongoDB'],
      bio: 'Backend developer with a love for clean code and efficient solutions',
      lastActive: '2 hours ago',
      mutualConnections: 5,
      isOnline: true
    },
    {
      id: 2,
      name: 'Lisa Park',
      avatar: '👩‍🔧',
      level: 8,
      skills: ['React', 'TypeScript', 'Testing'],
      bio: 'Software engineer specializing in React and modern web development',
      lastActive: '1 day ago',
      mutualConnections: 4,
      isOnline: false
    },
    {
      id: 3,
      name: 'Alex Rivera',
      avatar: '👨‍🔬',
      level: 15,
      skills: ['Python', 'Data Science', 'Machine Learning'],
      bio: 'Data scientist helping others learn through clear explanations',
      lastActive: '3 hours ago',
      mutualConnections: 1,
      isOnline: true
    }
  ];

  const suggestedConnections = [
    {
      id: 4,
      name: 'Sarah Chen',
      avatar: '👩‍💻',
      level: 15,
      skills: ['React', 'JavaScript', 'CSS'],
      bio: 'Full-stack developer passionate about creating beautiful user experiences',
      mutualConnections: 3,
      commonSkills: ['React', 'JavaScript']
    },
    {
      id: 5,
      name: 'Emma Wilson',
      avatar: '👩‍🎨',
      level: 10,
      skills: ['CSS', 'Design', 'UI/UX'],
      bio: 'Frontend designer focused on creating intuitive and accessible interfaces',
      mutualConnections: 2,
      commonSkills: ['CSS']
    },
    {
      id: 6,
      name: 'David Kim',
      avatar: '👨‍🎯',
      level: 13,
      skills: ['JavaScript', 'Performance', 'Optimization'],
      bio: 'Performance engineer focused on making the web faster',
      mutualConnections: 0,
      commonSkills: ['JavaScript']
    }
  ];

  const messages = [
    {
      id: 1,
      user: connections[0],
      lastMessage: 'Hey! I saw your project on React hooks. Great work!',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      user: connections[1],
      lastMessage: 'Thanks for the help with the TypeScript issue!',
      timestamp: '1 day ago',
      unread: false
    }
  ];

  const handleSendMessage = (user: any) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleConnect = (user: any) => {
    // Here you would typically send a connection request
    console.log('Sending connection request to:', user.name);
  };

  const handleMessageSubmit = () => {
    if (messageText.trim() && selectedUser) {
      // Here you would typically send the message
      console.log('Sending message to:', selectedUser.name, 'Message:', messageText);
      setMessageText('');
      setShowMessageModal(false);
      setSelectedUser(null);
    }
  };

  const renderUserCard = (user: any, showConnectButton = false) => (
    <div key={user.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.avatar}
          </div>
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[var(--lemonade-3)]">{user.name}</h3>
            <span className="text-xs text-[var(--lemonade-3)] opacity-80">Level {user.level}</span>
          </div>
          
          <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">{user.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {user.skills.map((skill: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-[var(--lemonade-1)] border border-[var(--lemonade-3)] rounded-full text-xs font-semibold text-[var(--lemonade-3)]">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--lemonade-3)] opacity-80">
              {user.mutualConnections} mutual connections
            </span>
            {user.lastActive && (
              <span className="text-xs text-[var(--lemonade-3)] opacity-80">
                {user.lastActive}
              </span>
            )}
          </div>
          
          {showConnectButton && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleConnect(user)}
                className="flex-1 py-2 px-3 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-[var(--lemonade-3)] shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
              >
                🤝 Connect
              </button>
              <button
                onClick={() => handleSendMessage(user)}
                className="py-2 px-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-[var(--lemonade-3)] shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
              >
                💬 Message
              </button>
            </div>
          )}
          
          {!showConnectButton && (
            <div className="mt-3">
              <button
                onClick={() => handleSendMessage(user)}
                className="w-full py-2 px-3 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-lg text-xs font-bold text-white shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
              >
                💬 Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMessageCard = (message: any) => (
    <div key={message.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {message.user.avatar}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[var(--lemonade-3)]">{message.user.name}</h3>
            <span className="text-xs text-[var(--lemonade-3)] opacity-80">{message.timestamp}</span>
          </div>
          
          <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-2">{message.lastMessage}</p>
          
          {message.unread && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--lemonade-4)] rounded-full"></div>
              <span className="text-xs text-[var(--lemonade-4)] font-bold">New message</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-2">Member Connections</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">Connect and collaborate with fellow learners</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            activeTab === 'connections'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          🤝 My Connections ({connections.length})
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            activeTab === 'discover'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          🔍 Discover Members ({suggestedConnections.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            activeTab === 'messages'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          💬 Messages ({messages.filter(m => m.unread).length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'connections' && (
          <div>
            <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-4">Your Connections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map(user => renderUserCard(user))}
            </div>
          </div>
        )}

        {activeTab === 'discover' && (
          <div>
            <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-4">Suggested Connections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedConnections.map(user => renderUserCard(user, true))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-4">Recent Messages</h3>
            <div className="space-y-4">
              {messages.map(message => renderMessageCard(message))}
            </div>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 max-w-md w-full mx-4 shadow-[8px_8px_0_0_var(--lemonade-3)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--lemonade-3)]">Send Message</h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-[var(--lemonade-3)] hover:text-[var(--lemonade-4)] transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center text-white font-bold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--lemonade-3)]">{selectedUser.name}</h4>
                  <p className="text-sm text-[var(--lemonade-3)] opacity-80">Level {selectedUser.level}</p>
                </div>
              </div>
            </div>
            
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write your message here..."
              className="w-full h-32 p-4 border-2 border-[var(--lemonade-3)] rounded-xl resize-none focus:outline-none focus:border-[var(--lemonade-4)] mb-4"
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-lg font-bold text-[var(--lemonade-3)] shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleMessageSubmit}
                disabled={!messageText.trim()}
                className="px-6 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-lg font-bold text-white shadow-[2px_2px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_0_var(--lemonade-3)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberConnections; 