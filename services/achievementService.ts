// services/achievementService.ts

import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { AchievementDefinition, UserAchievementProgress } from "@/models/achievement";

// --- NEW: Define all your achievements in one place ---
const ALL_ACHIEVEMENTS: Omit<AchievementDefinition, 'id'>[] = [
  {
    name: 'First Steps',
    description: 'Complete your first quest',
    icon: '👣', // CORRECTED
    xp: 50,
    total: 1,
  },
  {
    name: 'Speed Learner',
    description: 'Complete 5 quests in a week',
    icon: '⚡',
    xp: 100,
    total: 5,
  },
  {
    name: 'JavaScript Master',
    description: 'Complete all JavaScript quests',
    icon: '🧠',
    xp: 200,
    total: 10, // Example total
  },
  {
    name: 'React Developer',
    description: 'Complete all React quests',
    icon: '⚛️',
    xp: 300,
    total: 12, // Example total
  },
  {
    name: 'Streak Master',
    description: 'Maintain a 30-day learning streak',
    icon: '🔥',
    xp: 500,
    total: 30,
  },
  {
    name: 'Community Helper',
    description: 'Answer 10 questions in the forum',
    icon: '🤝',
    xp: 150,
    total: 10,
  }
];


/**
 * --- NEW: A "seeder" function to create all achievements automatically. ---
 * This function loops through your defined achievements and adds them to Firestore.
 * It's safe to run multiple times; it won't create duplicates.
 */
export const seedAchievementDefinitions = async () => {
  console.log("Starting to seed achievements...");
  const promises = ALL_ACHIEVEMENTS.map(achievementData => {
    // Create a simple ID from the name, e.g., "First Steps" -> "first_steps"
    const docId = achievementData.name.toLowerCase().replace(/\s+/g, '_');
    const docRef = doc(db, "achievements", docId);
    // Use setDoc with { merge: true } to create or update without overwriting everything
    return setDoc(docRef, achievementData, { merge: true });
  });

  await Promise.all(promises);
  console.log("Finished seeding achievements!");
};


/**
 * Fetches all achievement definitions from the public 'achievements' collection.
 */
export const getAllAchievementDefinitions = async (): Promise<AchievementDefinition[]> => {
  const querySnapshot = await getDocs(collection(db, "achievements"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AchievementDefinition));
};

/**
 * Fetches a user's achievement progress from their private sub-collection.
 */
export const getUserAchievements = async (userId: string): Promise<UserAchievementProgress[]> => {
  if (!userId) return [];
  const querySnapshot = await getDocs(collection(doc(db, 'users', userId), 'earned_achievements'));
  return querySnapshot.docs.map(doc => ({ achievementId: doc.id, ...doc.data() } as UserAchievementProgress));
};

/**
 * Increment progress for a specific achievement key based on an achievementId.
 * Creates the progress doc if missing and marks earned when total reached.
 */
export const incrementAchievementProgress = async (userId: string, achievementId: string, amount: number = 1): Promise<void> => {
  const userAchRef = doc(db, 'users', userId, 'earned_achievements', achievementId);
  const defRef = doc(db, 'achievements', achievementId);
  const [progressSnap, defSnap] = await Promise.all([getDoc(userAchRef), getDoc(defRef)]);
  if (!defSnap.exists()) return;
  const def = defSnap.data() as AchievementDefinition;
  const current = progressSnap.exists() ? (progressSnap.data() as UserAchievementProgress) : { achievementId, earned: false, earnedAt: null, progress: 0 };
  const nextProgress = Math.min((current.progress || 0) + amount, def.total);
  const earned = nextProgress >= def.total;
  await setDoc(userAchRef, {
    achievementId,
    progress: nextProgress,
    earned,
    earnedAt: earned ? Timestamp.now() : current.earnedAt || null,
  }, { merge: true });
};