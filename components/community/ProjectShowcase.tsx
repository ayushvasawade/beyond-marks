'use client';
import React from 'react';

const ProjectShowcase: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Interactive Todo App',
      creator: 'Sarah Chen',
      thumbnail: '📱',
      description: 'A beautiful todo app built with React and CSS animations',
      tags: ['React', 'JavaScript', 'CSS'],
      likes: 24,
      comments: 8,
      demoUrl: '#'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      creator: 'Alex Rivera',
      thumbnail: '🌤️',
      description: 'Real-time weather app with API integration and beautiful UI',
      tags: ['JavaScript', 'API', 'CSS'],
      likes: 31,
      comments: 12,
      demoUrl: '#'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      creator: 'Emma Wilson',
      thumbnail: '🎨',
      description: 'Responsive portfolio with smooth animations and modern design',
      tags: ['HTML', 'CSS', 'JavaScript'],
      likes: 18,
      comments: 5,
      demoUrl: '#'
    },
    {
      id: 4,
      title: 'Calculator App',
      creator: 'Mike Johnson',
      thumbnail: '🧮',
      description: 'Advanced calculator with scientific functions and history',
      tags: ['JavaScript', 'CSS'],
      likes: 15,
      comments: 3,
      demoUrl: '#'
    },
    {
      id: 5,
      title: 'Recipe Finder',
      creator: 'Lisa Park',
      thumbnail: '🍳',
      description: 'Find and save your favorite recipes with search functionality',
      tags: ['React', 'API', 'CSS'],
      likes: 42,
      comments: 15,
      demoUrl: '#'
    },
    {
      id: 6,
      title: 'Music Player',
      creator: 'David Kim',
      thumbnail: '🎵',
      description: 'Custom music player with playlist management and audio controls',
      tags: ['JavaScript', 'HTML5', 'CSS'],
      likes: 28,
      comments: 9,
      demoUrl: '#'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-2">Project Showcase</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">Discover amazing projects from our community</p>
        </div>
        <button className="px-6 py-3 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
          Share Your Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl overflow-hidden shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150 cursor-pointer group">
            {/* Project Thumbnail */}
            <div className="h-48 bg-[var(--lemonade-1)] border-b-4 border-[var(--lemonade-3)] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
              {project.thumbnail}
            </div>
            
            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--lemonade-3)] mb-2 group-hover:text-[var(--lemonade-4)] transition-colors duration-150">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">
                by {project.creator}
              </p>
              <p className="text-sm text-[var(--lemonade-3)] mb-4 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[var(--lemonade-2)] border border-[var(--lemonade-3)] rounded-full text-xs font-semibold text-[var(--lemonade-3)]">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--lemonade-4)]">❤️</span>
                    <span className="text-sm font-semibold text-[var(--lemonade-3)]">{project.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--lemonade-4)]">💬</span>
                    <span className="text-sm font-semibold text-[var(--lemonade-3)]">{project.comments}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-sm font-semibold text-white hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase; 