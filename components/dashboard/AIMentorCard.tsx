'use client';
import React, { useState } from 'react';

const AIMentorCard: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[var(--lemonade-2)] border-3 border-[var(--lemonade-4)] rounded-xl flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--lemonade-3)]">AI Mentor (GEM)</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">Your personal coding companion</p>
        </div>
      </div>
      
      {/* GEM Mascot */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-20 h-20 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-4)] rounded-full flex items-center justify-center">
            <span className="text-4xl">💎</span>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--lemonade-4)] border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">AI</span>
          </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-2xl p-4 mb-4 min-h-[120px]">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-6 h-6 bg-[var(--lemonade-4)] rounded-full flex items-center justify-center">
            <span className="text-xs text-white">G</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--lemonade-3)]">
              Hi! I'm GEM, your AI mentor. Ask me anything about coding, and I'll help you learn! 🚀
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[var(--lemonade-2)] rounded-full flex items-center justify-center">
            <span className="text-xs text-[var(--lemonade-3)]">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--lemonade-3)] opacity-60">
              Type your question here...
            </p>
          </div>
        </div>
      </div>
      
      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask GEM anything..."
          className="flex-1 px-4 py-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] placeholder-[var(--lemonade-3)] placeholder-opacity-60 focus:border-[var(--lemonade-4)] focus:outline-none"
        />
        <button className="px-4 py-3 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIMentorCard; 