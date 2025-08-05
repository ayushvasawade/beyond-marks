'use client';
import React, { useState } from 'react';

const QAForum: React.FC = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'most-voted' | 'unanswered'>('latest');

  const questions = [
    {
      id: 1,
      title: 'How to implement dark mode toggle in React?',
      user: 'Mike Johnson',
      tags: ['React', 'JavaScript', 'CSS'],
      votes: 15,
      answers: 3,
      isAnswered: true,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Best practices for responsive design with CSS Grid?',
      user: 'Emma Wilson',
      tags: ['CSS', 'Responsive'],
      votes: 8,
      answers: 5,
      isAnswered: true,
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      title: 'How to handle API errors in JavaScript fetch?',
      user: 'Alex Rivera',
      tags: ['JavaScript', 'API'],
      votes: 12,
      answers: 0,
      isAnswered: false,
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      title: 'Understanding React hooks - useEffect vs useState?',
      user: 'Sarah Chen',
      tags: ['React', 'JavaScript'],
      votes: 23,
      answers: 7,
      isAnswered: true,
      timestamp: '1 day ago'
    },
    {
      id: 5,
      title: 'How to optimize images for web performance?',
      user: 'David Kim',
      tags: ['Performance', 'Images'],
      votes: 6,
      answers: 2,
      isAnswered: false,
      timestamp: '2 days ago'
    }
  ];

  const filteredQuestions = questions.filter(question => {
    if (sortBy === 'unanswered') {
      return !question.isAnswered;
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-2">Q&A Forum</h2>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80">Get help from the community</p>
        </div>
        <button className="px-6 py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
          Ask a New Question
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSortBy('latest')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            sortBy === 'latest'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setSortBy('most-voted')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            sortBy === 'most-voted'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          Most Voted
        </button>
        <button
          onClick={() => setSortBy('unanswered')}
          className={`px-4 py-2 rounded-xl font-semibold border-2 transition-all duration-150 ${
            sortBy === 'unanswered'
              ? 'bg-[var(--lemonade-4)] text-white border-[var(--lemonade-3)]'
              : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)] hover:bg-[var(--lemonade-2)]'
          }`}
        >
          Unanswered
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150 cursor-pointer">
            <div className="flex gap-4">
              {/* Vote Stats */}
              <div className="flex flex-col items-center gap-2 min-w-[60px]">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--lemonade-4)]">{question.votes}</div>
                  <div className="text-xs text-[var(--lemonade-3)] opacity-80">votes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--lemonade-3)]">{question.answers}</div>
                  <div className="text-xs text-[var(--lemonade-3)] opacity-80">answers</div>
                </div>
                {question.isAnswered && (
                  <div className="w-6 h-6 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--lemonade-3)]">✓</span>
                  </div>
                )}
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-2 hover:text-[var(--lemonade-4)] transition-colors duration-150">
                  {question.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-[var(--lemonade-1)] border border-[var(--lemonade-3)] rounded-full text-xs font-semibold text-[var(--lemonade-3)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-[var(--lemonade-3)] opacity-80">
                  <span>asked by {question.user}</span>
                  <span>{question.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QAForum; 