'use client';
import React, { useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import CartoonFooter from '../../components/CartoonFooter';
import TownSquare from '../../components/community/TownSquare';
import QAForum from '../../components/community/QAForum';
import ProjectShowcase from '../../components/community/ProjectShowcase';
import TheArena from '../../components/community/TheArena';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<'town-square' | 'qa-forum' | 'project-showcase' | 'arena'>('town-square');

  const tabs = [
    { id: 'town-square', name: 'Town Square', icon: '🏘️' },
    { id: 'qa-forum', name: 'Q&A Forum', icon: '❓' },
    { id: 'project-showcase', name: 'Project Showcase', icon: '🎨' },
    { id: 'arena', name: 'The Arena', icon: '⚔️' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'town-square':
        return <TownSquare />;
      case 'qa-forum':
        return <QAForum />;
      case 'project-showcase':
        return <ProjectShowcase />;
      case 'arena':
        return <TheArena />;
      default:
        return <TownSquare />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 w-full">
        {/* Community Navigation */}
        <div className="bg-white border-b-4 border-[var(--lemonade-3)]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg border-4 transition-all duration-150 ${
                    activeTab === tab.id
                      ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)]'
                      : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)]'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {renderActiveTab()}
        </div>
      </main>
      
      <CartoonFooter />
    </div>
  );
};

export default CommunityPage; 