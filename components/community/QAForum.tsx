'use client';
import React, { useState } from 'react';

const QAForum: React.FC = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'most-voted' | 'unanswered'>('latest');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const questions = [
    {
      id: 1,
      title: 'How to implement dark mode toggle in React?',
      user: 'Mike Johnson',
      tags: ['React', 'JavaScript', 'CSS'],
      votes: 15,
      answers: 3,
      isAnswered: true,
      timestamp: '2 hours ago',
      content: 'I\'m trying to implement a dark mode toggle in my React app. I\'ve seen some examples but I\'m not sure about the best approach. Should I use CSS variables, context, or a library?',
      answersList: [
        {
          id: 1,
          user: 'Sarah Chen',
          content: 'I recommend using CSS variables with React context. Here\'s a simple implementation...',
          votes: 8,
          timestamp: '1 hour ago',
          isAccepted: true
        },
        {
          id: 2,
          user: 'Alex Rivera',
          content: 'You can also use a library like react-toggle-dark-mode which handles everything for you.',
          votes: 5,
          timestamp: '30 minutes ago',
          isAccepted: false
        },
        {
          id: 3,
          user: 'Emma Wilson',
          content: 'Here\'s my approach using CSS custom properties and localStorage...',
          votes: 3,
          timestamp: '15 minutes ago',
          isAccepted: false
        }
      ]
    },
    {
      id: 2,
      title: 'Best practices for responsive design with CSS Grid?',
      user: 'Emma Wilson',
      tags: ['CSS', 'Responsive'],
      votes: 8,
      answers: 5,
      isAnswered: true,
      timestamp: '4 hours ago',
      content: 'I\'m working on a responsive layout and want to use CSS Grid. What are the best practices for creating flexible, responsive grids?',
      answersList: [
        {
          id: 1,
          user: 'David Kim',
          content: 'Use fr units for flexible columns and minmax() for responsive behavior...',
          votes: 12,
          timestamp: '3 hours ago',
          isAccepted: true
        }
      ]
    },
    {
      id: 3,
      title: 'How to handle API errors in JavaScript fetch?',
      user: 'Alex Rivera',
      tags: ['JavaScript', 'API'],
      votes: 12,
      answers: 0,
      isAnswered: false,
      timestamp: '6 hours ago',
      content: 'I\'m making API calls with fetch but I\'m not sure how to properly handle errors. What\'s the best way to catch and handle different types of errors?',
      answersList: []
    },
    {
      id: 4,
      title: 'Understanding React hooks - useEffect vs useState?',
      user: 'Sarah Chen',
      tags: ['React', 'JavaScript'],
      votes: 23,
      answers: 7,
      isAnswered: true,
      timestamp: '1 day ago',
      content: 'I\'m confused about when to use useEffect vs useState. Can someone explain the difference and when to use each?',
      answersList: [
        {
          id: 1,
          user: 'Mike Johnson',
          content: 'useState is for managing state, useEffect is for side effects. Here\'s a clear explanation...',
          votes: 15,
          timestamp: '1 day ago',
          isAccepted: true
        }
      ]
    },
    {
      id: 5,
      title: 'How to optimize images for web performance?',
      user: 'David Kim',
      tags: ['Performance', 'Images'],
      votes: 6,
      answers: 2,
      isAnswered: false,
      timestamp: '2 days ago',
      content: 'My website is loading slowly and I think it\'s because of large images. What are the best practices for optimizing images?',
      answersList: [
        {
          id: 1,
          user: 'Emma Wilson',
          content: 'Use WebP format, implement lazy loading, and consider using a CDN...',
          votes: 4,
          timestamp: '1 day ago',
          isAccepted: false
        }
      ]
    }
  ];

  const filteredQuestions = questions.filter(question => {
    if (sortBy === 'unanswered') {
      return !question.isAnswered;
    }
    return true;
  });

  const handleAnswerSubmit = () => {
    if (answerText.trim() && selectedQuestion) {
      // Here you would typically save the answer to your backend
      console.log('Submitting answer:', answerText);
      setAnswerText('');
      setShowAnswerModal(false);
      setSelectedQuestion(null);
    }
  };

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestion(selectedQuestion === questionId ? null : questionId);
  };

  const selectedQuestionData = selectedQuestion ? questions.find(q => q.id === selectedQuestion) : null;

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
          <div key={question.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
            {/* Question Header */}
            <div 
              className="p-6 cursor-pointer"
              onClick={() => handleQuestionClick(question.id)}
            >
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

            {/* Expanded Question Details */}
            {selectedQuestion === question.id && (
              <div className="border-t-4 border-[var(--lemonade-3)] p-6">
                {/* Question Content */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-[var(--lemonade-3)] mb-3">Question:</h4>
                  <p className="text-[var(--lemonade-3)] mb-4">{question.content}</p>
                </div>

                {/* Answers Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-[var(--lemonade-3)] mb-3">
                    Answers ({question.answersList.length})
                  </h4>
                  
                  {question.answersList.length > 0 ? (
                    <div className="space-y-4">
                      {question.answersList.map((answer) => (
                        <div key={answer.id} className="bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[var(--lemonade-3)]">{answer.user}</span>
                              {answer.isAccepted && (
                                <span className="px-2 py-1 bg-[var(--lemonade-2)] border border-[var(--lemonade-3)] rounded-full text-xs font-bold text-[var(--lemonade-3)]">
                                  ✓ Accepted
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-[var(--lemonade-3)] opacity-80">
                              {answer.timestamp}
                            </div>
                          </div>
                          <p className="text-[var(--lemonade-3)] mb-3">{answer.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-[var(--lemonade-3)] opacity-80 hover:opacity-100 transition-opacity">
                              <span>👍</span>
                              <span>{answer.votes} votes</span>
                            </button>
                            <button className="text-sm text-[var(--lemonade-3)] opacity-80 hover:opacity-100 transition-opacity">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--lemonade-3)] opacity-80 italic">No answers yet. Be the first to answer!</p>
                  )}
                </div>

                {/* Answer Form */}
                <div className="border-t-2 border-[var(--lemonade-3)] border-opacity-20 pt-6">
                  <h4 className="text-lg font-bold text-[var(--lemonade-3)] mb-3">Your Answer</h4>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full h-32 p-4 border-2 border-[var(--lemonade-3)] rounded-xl resize-none focus:outline-none focus:border-[var(--lemonade-4)]"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!answerText.trim()}
                      className="px-6 py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_var(--lemonade-3)]"
                    >
                      Post Answer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QAForum; 