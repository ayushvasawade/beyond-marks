'use client';
import React, { useState } from 'react';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import CartoonFooter from '@/components/CartoonFooter';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import ProfileSettings from '@/components/profile/ProfileSettings';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '👤' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ProfileStats />;
      case 'achievements':
        return <ProfileAchievements />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <ProfileStats />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <ProfileHeader />
          
          {/* Profile Navigation */}
          <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          
          {/* Tab Content */}
          {renderActiveTab()}
        </div>
      </main>
      
      <CartoonFooter />
    </div>
  );
};

export default ProfilePage; 