// services/userService.ts

import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { User, UserSettings } from "@/models/user"; // Correct path to your model

// STEP 1: DEFINE THE DEFAULT SETTINGS OBJECT
// This is the part that was missing.
const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: false,
    questReminders: true,
    achievementAlerts: true,
    communityUpdates: false,
  },
  privacy: {
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
  },
  preferences: {
    theme: 'lemonade',
    dailyGoal: 30,
    language: 'English',
  },
};

// This is the interface for the data from Clerk's webhook
interface ClerkWebhookUserData {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
}

/**
 * Creates a new user with default settings. This is called by the webhook.
 */
export const syncUserWithDb = async (userData: ClerkWebhookUserData) => {
  try {
    // STEP 2: USE THE DEFINED OBJECT
    // Now this line will work without errors.
    await setDoc(doc(db, "users", userData.clerkId), {
      clerkId: userData.clerkId,
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      imageUrl: userData.imageUrl || '',
      createdAt: Timestamp.now(),
      settings: defaultSettings, // This now correctly refers to the object above
    });
  } catch (e) {
    console.error("Error syncing user with DB: ", e);
    throw e;
  }
};

/**
 * Fetches a user document from Firestore by their Clerk ID.
 */
export const getUserById = async (clerkId: string): Promise<User | null> => {
  const userSnap = await getDoc(doc(db, "users", clerkId));
  return userSnap.exists() ? (userSnap.data() as User) : null;
};

/**
 * Updates the settings for a specific user.
 */
export const updateUserSettings = async (clerkId: string, newSettings: UserSettings): Promise<void> => {
  if (!clerkId) return;
  const userRef = doc(db, "users", clerkId);
  await updateDoc(userRef, { settings: newSettings });
};
