'use client';
import React from 'react';
import TheGuide from './TheGuide';
import TheWorkshop from './TheWorkshop';
import TheMentor from './TheMentor';

const LearningLabLayout: React.FC = () => {
  return (
    <div className="h-screen flex">
      {/* Left Pane: The Guide */}
      <div className="w-1/3 bg-white border-r-2 border-[var(--lemonade-3)] border-opacity-20">
        <TheGuide />
      </div>
      
      {/* Center Pane: The Workshop */}
      <div className="w-1/3 bg-white border-r-2 border-[var(--lemonade-3)] border-opacity-20">
        <TheWorkshop />
      </div>
      
      {/* Right Pane: The Mentor */}
      <div className="w-1/3 bg-white">
        <TheMentor />
      </div>
    </div>
  );
};

export default LearningLabLayout; 