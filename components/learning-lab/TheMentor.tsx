'use client';
import React, { useState } from 'react';

const TheMentor: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'gem',
      message: 'Hi! I\'m GEM, your AI mentor. I\'m here to help you with this array lesson! 🚀',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      sender: 'user',
      message: 'I\'m not sure how to start with arrays...',
      timestamp: '1 min ago'
    },
    {
      id: 3,
      sender: 'gem',
      message: 'No worries! Arrays are just lists of items. Think of them like a shopping list - you can add items, remove them, and see how many you have. Let\'s start with creating a simple array! 💡',
      timestamp: '1 min ago'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'user',
        message: message,
        timestamp: 'Just now'
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      // Simulate GEM response
      setTimeout(() => {
        const gemResponse = {
          id: chatHistory.length + 2,
          sender: 'gem',
          message: 'Great question! I can see you\'re working on the array exercise. Remember, arrays start counting from 0, so the first item is at position 0! 🎯',
          timestamp: 'Just now'
        };
        setChatHistory(prev => [...prev, gemResponse]);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-[var(--lemonade-3)] border-opacity-20">
        <div className="w-10 h-10 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-4)] rounded-full flex items-center justify-center">
          <span className="text-xl">💎</span>
        </div>
        <div>
          <h2 className="font-semibold text-[var(--lemonade-3)]">GEM Mentor</h2>
          <p className="text-xs text-[var(--lemonade-3)] opacity-70">Your AI coding companion</p>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatHistory.map((chat) => (
          <div key={chat.id} className={`flex gap-3 ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {chat.sender === 'gem' && (
              <div className="w-8 h-8 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-white">G</span>
              </div>
            )}
            
            <div className={`max-w-[80%] ${chat.sender === 'user' ? 'order-first' : ''}`}>
              <div className={`p-3 rounded-xl ${
                chat.sender === 'user' 
                  ? 'bg-[var(--lemonade-4)] text-white' 
                  : 'bg-[var(--lemonade-1)] border border-[var(--lemonade-3)] text-[var(--lemonade-3)]'
              }`}>
                <p className="text-sm">{chat.message}</p>
              </div>
              <p className="text-xs text-[var(--lemonade-3)] opacity-60 mt-1">
                {chat.timestamp}
              </p>
            </div>
            
            {chat.sender === 'user' && (
              <div className="w-8 h-8 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm text-[var(--lemonade-3)]">U</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask GEM anything..."
          className="flex-1 px-4 py-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] placeholder-[var(--lemonade-3)] placeholder-opacity-60 focus:border-[var(--lemonade-4)] focus:outline-none"
        />
        <button 
          onClick={handleSendMessage}
          className="px-4 py-3 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TheMentor; 