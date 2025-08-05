'use client';
import React from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import CartoonFooter from '../../components/CartoonFooter';
import LearningLabLayout from '../../components/learning-lab/LearningLabLayout';

const LearningLabPage = () => {
  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-1 w-full">
        <LearningLabLayout />
      </main>
      
      <CartoonFooter />
    </div>
  );
};

export default LearningLabPage; 