// model/user.ts

import { Timestamp } from "firebase/firestore";

// Define the shape of the settings
export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    questReminders: boolean;
    achievementAlerts: boolean;
    communityUpdates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showProgress: boolean;
    showAchievements: boolean;
    allowMessages: boolean;
  };
  preferences: {
    theme: 'lemonade' | 'dark' | 'light';
    dailyGoal: number;
    language: string;
  };
}

export interface User {
  clerkId: string;
  email: string;
  
  // These will default to empty strings if not provided by Clerk
  firstName: string;
  lastName: string;
  imageUrl: string;
  
  createdAt: Timestamp;
  xp?: number;
  settings?: UserSettings; // <-- ADD THIS LINE
}