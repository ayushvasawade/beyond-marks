// models/achievement.ts
import { Timestamp } from "firebase/firestore";

/**
 * Defines the static properties of an achievement.
 * This will be stored in a public 'achievements' collection.
 */
export interface AchievementDefinition {
  id: string; // The document ID, e.g., "first_steps"
  name: string;
  description: string;
  icon: string;
  xp: number;
  total: number; // The target number for completion, e.g., 5 for "complete 5 quests"
}

/**
 * Defines a user's specific progress on an achievement.
 * This will be stored in a sub-collection for each user.
 */
export interface UserAchievementProgress {
  achievementId: string;
  earned: boolean;
  earnedAt: Timestamp | null;
  progress: number;
}
