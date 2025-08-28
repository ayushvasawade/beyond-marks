'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TheArena: React.FC = () => {
  const [matchmakingStatus, setMatchmakingStatus] = useState('idle');
  const [matchmakingId, setMatchmakingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (matchmakingStatus === 'searching' && matchmakingId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`/api/arena/matchmaking/${matchmakingId}`);
          const data = await response.json();
          if (response.ok && data.battleId) {
            setMatchmakingStatus('matched');
            router.push(`/community/arena/${data.battleId}`);
          }
        } catch (error) {
          console.error('Error checking matchmaking status:', error);
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [matchmakingStatus, matchmakingId, router]);

  const handleMatchmaking = async () => {
    setMatchmakingStatus('searching');
    try {
      const response = await fetch('/api/arena/matchmake', {
        method: 'POST',
      });

      if (!response.ok) {
        // Handle non-JSON responses for errors
        const errorText = await response.text();
        console.error('Matchmaking failed:', errorText);
        // Optionally, provide user feedback here
        alert(`Error: ${errorText}`);
        setMatchmakingStatus('idle');
        return;
      }

      const data = await response.json();
      setMatchmakingId(data.matchmakingId);
      if (data.battleId) {
        setMatchmakingStatus('matched');
        router.push(`/community/arena/${data.battleId}`);
      }
    } catch (error) {
      setMatchmakingStatus('idle');
      console.error('Error during matchmaking:', error);
      // Optionally, provide user feedback here
      if (error instanceof Error) {
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  const handleCancelMatchmaking = async () => {
    try {
      const response = await fetch('/api/arena/matchmake', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to cancel matchmaking:', errorText);
        alert(`Error: ${errorText}`);
        return;
      }

      const data = await response.json();
      setMatchmakingStatus('idle');
      setMatchmakingId(null); // Clear matchmaking ID on cancellation
      alert(data.message || 'Matchmaking cancelled successfully!');
    } catch (error) {
      console.error('Error during matchmaking cancellation:', error);
      alert('An unexpected error occurred during cancellation.');
    }
  };

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', xp: 2840, wins: 12 },
    { rank: 2, name: 'Mike Johnson', xp: 2150, wins: 8 },
    { rank: 3, name: 'Emma Wilson', xp: 1890, wins: 6 },
    { rank: 4, name: 'Alex Rivera', xp: 1650, wins: 5 },
    { rank: 5, name: 'David Kim', xp: 1420, wins: 4 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Matchmaking Section */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">⚔️ The Arena</h2>
        <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
          <h3 className="text-lg font-bold text-[var(--lemonade-3)] mb-2">Ready for a Challenge?</h3>
          <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-4">
            Click the button below to find an opponent and start a real-time coding battle.
          </p>
          {matchmakingStatus === 'searching' ? (
            <button
              className="w-full py-3 bg-red-500 border-4 border-red-600 rounded-xl font-bold text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150"
              onClick={handleCancelMatchmaking}
            >
              Stop Matchmaking
            </button>
          ) : (
            <button 
              className="w-full py-3 bg-[var(--lemonade-4)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-white shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150"
              onClick={handleMatchmaking}
            >
              Start Battle
            </button>
          )}
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