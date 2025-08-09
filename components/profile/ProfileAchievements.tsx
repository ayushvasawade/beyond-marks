// ProfileAchievements.tsx

'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
// Make sure to import your seeder function
import { getAllAchievementDefinitions, getUserAchievements, seedAchievementDefinitions } from '@/services/achievementService';
import { AchievementDefinition, UserAchievementProgress } from '@/models/achievement';

// A new combined type for our component's state
interface DisplayAchievement extends AchievementDefinition {
  earned: boolean;
  earnedAt: Date | null;
  progress: number;
}

const ProfileAchievements: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [achievements, setAchievements] = useState<DisplayAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- NEW: A function to handle the one-time database seeding ---
  const handleSeedClick = async () => {
    try {
      await seedAchievementDefinitions();
      alert('Successfully seeded achievements! You can now remove this button from the code.');
      // Re-fetch data to show the new achievements immediately
      fetchAndCombineData();
    } catch (error) {
      console.error("Seeding failed:", error);
      alert('Seeding failed. Check the console for errors.');
    }
  };

  const fetchAndCombineData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [definitions, userProgressList] = await Promise.all([
        getAllAchievementDefinitions(),
        getUserAchievements(user.id)
      ]);

      const progressMap = new Map<string, UserAchievementProgress>();
      userProgressList.forEach(p => progressMap.set(p.achievementId, p));

      const displayData = definitions.map(def => {
        const progress = progressMap.get(def.id);
        return {
          ...def,
          earned: progress?.earned || false,
          earnedAt: progress?.earnedAt?.toDate() || null,
          progress: progress?.progress || 0,
        };
      });

      setAchievements(displayData);
    } catch (err) {
      console.error("Failed to load achievements:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchAndCombineData();
    }
  }, [isLoaded, user]);

  if (isLoading) {
    return <div>Loading achievements...</div>;
  }

  const earnedAchievements = achievements.filter(a => a.earned);
  const unearnedAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-8">
      {/* Achievement Stats */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">🏆 Achievement Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">{earnedAchievements.length}</div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Achievements Earned</div>
          </div>
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">{achievements.length}</div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Total Available</div>
          </div>
          <div className="text-center p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div className="text-3xl font-bold text-[var(--lemonade-4)]">
              {achievements.length > 0 ? Math.round((earnedAchievements.length / achievements.length) * 100) : 0}%
            </div>
            <div className="text-sm text-[var(--lemonade-3)] opacity-80">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">✅ Earned Achievements</h2>
        {earnedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedAchievements.map((achievement) => (
              <div key={achievement.id} className="p-4 bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className="font-bold text-[var(--lemonade-3)]">{achievement.name}</h3>
                    <p className="text-xs text-[var(--lemonade-3)] opacity-80">+{achievement.xp} XP</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--lemonade-3)] mb-2">{achievement.description}</p>
                <p className="text-xs text-[var(--lemonade-3)] opacity-60">
                  Earned {achievement.earnedAt?.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--lemonade-3)] opacity-80">No achievements earned yet. Keep learning!</p>
        )}
      </div>

      {/* Unearned Achievements */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-4">🎯 In Progress</h2>
        {unearnedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unearnedAchievements.map((achievement) => (
              <div key={achievement.id} className="p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl opacity-60">{achievement.icon}</span>
                  <div>
                    <h3 className="font-bold text-[var(--lemonade-3)] opacity-80">{achievement.name}</h3>
                    <p className="text-xs text-[var(--lemonade-3)] opacity-60">+{achievement.xp} XP</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-3">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[var(--lemonade-3)] opacity-80">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.total}</span>
                  </div>
                  <div className="w-full bg-[var(--lemonade-3)] bg-opacity-20 border border-[var(--lemonade-3)] rounded-full h-2">
                    <div 
                      className="bg-[var(--lemonade-4)] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--lemonade-3)] opacity-80">You&apos;ve earned all available achievements!</p>
        )}
      </div>
    </div>
  );
};

export default ProfileAchievements;
