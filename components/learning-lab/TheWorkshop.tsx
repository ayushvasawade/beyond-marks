'use client';
import React, { useState } from 'react';

const TheWorkshop: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [code, setCode] = useState(`// Your code here
let myColors = ["red", "blue", "green"];
myColors.push("yellow");

console.log(myColors);`);

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b-2 border-[var(--lemonade-3)] border-opacity-20">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors duration-150 ${
            activeTab === 'editor'
              ? 'text-[var(--lemonade-4)] border-b-2 border-[var(--lemonade-4)]'
              : 'text-[var(--lemonade-3)] opacity-70 hover:opacity-100'
          }`}
        >
          Code Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 px-4 font-semibold text-sm transition-colors duration-150 ${
            activeTab === 'preview'
              ? 'text-[var(--lemonade-4)] border-b-2 border-[var(--lemonade-4)]'
              : 'text-[var(--lemonade-3)] opacity-70 hover:opacity-100'
          }`}
        >
          Live Preview
        </button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-4">
        {activeTab === 'editor' ? (
          /* Code Editor */
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-[var(--lemonade-5)] border-2 border-[var(--lemonade-3)] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--lemonade-1)] opacity-70">main.js</span>
                <span className="text-xs text-[var(--lemonade-1)] opacity-70">JavaScript</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-[var(--lemonade-1)] text-sm font-mono resize-none outline-none"
                placeholder="// Start coding here..."
              />
            </div>
          </div>
        ) : (
          /* Live Preview */
          <div className="h-full bg-white border-2 border-[var(--lemonade-3)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[var(--lemonade-3)]">Output</span>
              <span className="text-xs text-[var(--lemonade-3)] opacity-70">Live Preview</span>
            </div>
            <div className="bg-[var(--lemonade-1)] border border-[var(--lemonade-3)] rounded-lg p-4 min-h-[200px]">
              <div className="text-sm text-[var(--lemonade-3)]">
                <p className="mb-2">Console Output:</p>
                <div className="bg-[var(--lemonade-5)] text-[var(--lemonade-1)] p-3 rounded font-mono text-xs">
                  <div>{['red', 'blue', 'green', 'yellow'].join(', ')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Action Button */}
      <div className="p-4 border-t-2 border-[var(--lemonade-3)] border-opacity-20">
        <button className="w-full py-4 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-2xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
          Check My Work
        </button>
      </div>
    </div>
  );
};

export default TheWorkshop; 