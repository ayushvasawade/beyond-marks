'use client';
import React from 'react';

const TheArena: React.FC = () => {
  const challenges = [
    {
      id: 1,
      title: 'Speed Coding Challenge',
      description: 'Build a responsive navigation bar in 30 minutes',
      participants: 24,
      prize: '500 XP',
      status: 'active',
      timeLeft: '2 hours',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Algorithm Battle',
      description: 'Solve complex algorithms and compete for the fastest solution',
      participants: 18,
      prize: '1000 XP',
      status: 'upcoming',
      timeLeft: '1 day',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'UI/UX Design Contest',
      description: 'Create the most beautiful landing page design',
      participants: 31,
      prize: '750 XP',
      status: 'active',
      timeLeft: '5 hours',
      difficulty: 'Intermediate'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', xp: 2840, wins: 12 },
    { rank: 2, name: 'Mike Johnson', xp: 2150, wins: 8 },
    { rank: 3, name: 'Emma Wilson', xp: 1890, wins: 6 },
    { rank: 4, name: 'Alex Rivera', xp: 1650, wins: 5 },
    { rank: 5, name: 'David Kim', xp: 1420, wins: 4 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Active Challenges */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">⚔️ Active Challenges</h2>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-2">{challenge.title}</h3>
                  <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">{challenge.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                  challenge.status === 'active' 
                    ? 'bg-[var(--lemonade-2)] text-[var(--lemonade-3)] border-[var(--lemonade-3)]'
                    : 'bg-[var(--lemonade-1)] text-[var(--lemonade-3)] border-[var(--lemonade-3)]'
                }`}>
                  {challenge.status === 'active' ? 'ACTIVE' : 'UPCOMING'}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--lemonade-4)]">👥</span>
                    <span className="text-sm font-semibold text-[var(--lemonade-3)]">{challenge.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--lemonade-4)]">🏆</span>
                    <span className="text-sm font-semibold text-[var(--lemonade-3)]">{challenge.prize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[var(--lemonade-4)]">⏰</span>
                    <span className="text-sm font-semibold text-[var(--lemonade-3)]">{challenge.timeLeft}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  challenge.difficulty === 'Beginner' ? 'bg-[var(--lemonade-2)] text-[var(--lemonade-3)]' :
                  challenge.difficulty === 'Intermediate' ? 'bg-[var(--lemonade-4)] text-white' :
                  'bg-[var(--lemonade-5)] text-[var(--lemonade-1)]'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
              
              <button className="w-full py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
                Join Challenge
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">🏆 Arena Leaderboard</h2>
        <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div key={player.rank} className="flex items-center gap-4 p-3 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  player.rank === 1 ? 'bg-[var(--lemonade-2)] text-[var(--lemonade-3)]' :
                  player.rank === 2 ? 'bg-[var(--lemonade-4)] text-white' :
                  player.rank === 3 ? 'bg-[var(--lemonade-5)] text-[var(--lemonade-1)]' :
                  'bg-[var(--lemonade-1)] text-[var(--lemonade-3)]'
                }`}>
                  {player.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[var(--lemonade-3)]">{player.name}</p>
                  <p className="text-xs text-[var(--lemonade-3)] opacity-80">{player.wins} wins</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--lemonade-4)]">{player.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 shadow-[4px_4px_0_0_var(--lemonade-3)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--lemonade-4)]">73</div>
              <div className="text-sm text-[var(--lemonade-3)] opacity-80">Active Participants</div>
            </div>
          </div>
          <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 shadow-[4px_4px_0_0_var(--lemonade-3)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--lemonade-4)]">15</div>
              <div className="text-sm text-[var(--lemonade-3)] opacity-80">Challenges Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheArena; 