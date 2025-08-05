'use client';
import React from 'react';
import ActivityFeed from './ActivityFeed';
import SidebarWidgets from './SidebarWidgets';

const TownSquare: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Activity Feed - Takes 2/3 of the space */}
      <div className="lg:col-span-2">
        <ActivityFeed />
      </div>
      
      {/* Sidebar Widgets - Takes 1/3 of the space */}
      <div className="lg:col-span-1">
        <SidebarWidgets />
      </div>
    </div>
  );
};

export default TownSquare; 