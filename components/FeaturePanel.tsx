'use client';

import React from 'react';

interface FeaturePanelProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({ icon, title, className = '' }) => (
  <div
    className={`bg-white border-4 border-black rounded-3xl shadow-[4px_4px_0_0_black] flex flex-col items-center justify-center p-6 min-w-[180px] max-w-xs min-h-[180px] cartoon-panel ${className}`}
    aria-label={title}
  >
    <div className="mb-4" aria-hidden>{icon}</div>
    <h3 className="text-2xl font-bold cartoon-outline text-center">{title}</h3>
    <style jsx>{`
      .cartoon-outline {
        -webkit-text-stroke: 2px #000;
        color: #fff;
      }
      .cartoon-panel {
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .cartoon-panel:hover, .cartoon-panel:focus {
        transform: translateY(-6px) scale(1.03) rotate(-2deg);
        box-shadow: 8px 8px 0 0 #000;
      }
    `}</style>
  </div>
);

export default FeaturePanel; 