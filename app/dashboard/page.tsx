'use client';
import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import CartoonFooter from '../../components/CartoonFooter';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import NextQuestCard from '../../components/dashboard/NextQuestCard';
import AIMentorCard from '../../components/dashboard/AIMentorCard';
import AchievementsCard from '../../components/dashboard/AchievementsCard';
import CommunityCard from '../../components/dashboard/CommunityCard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 w-full flex flex-col items-center px-4 py-8">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="mb-12">
            <DashboardHeader />
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {/* Next Quest Card - Takes full width on large screens */}
            <div className="lg:col-span-2 xl:col-span-2 w-full max-w-4xl">
              <NextQuestCard />
            </div>
            
            {/* AI Mentor Card */}
            <div className="lg:col-span-2 xl:col-span-1 w-full max-w-md">
              <AIMentorCard />
            </div>
            
            {/* Achievements and Community Cards - Centered */}
            <div className="lg:col-span-2 xl:col-span-3 w-full flex flex-col lg:flex-row gap-8 justify-center items-center">
              {/* Achievements Card */}
              <div className="w-full max-w-md">
                <AchievementsCard />
              </div>
              
              {/* Community Card */}
              <div className="w-full max-w-md">
                <CommunityCard />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <CartoonFooter />
    </div>
  );
};

export default DashboardPage;