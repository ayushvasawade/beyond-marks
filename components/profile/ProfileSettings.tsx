// ProfileSettings.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser, UserProfile } from "@clerk/nextjs";
import { getUserById, updateUserSettings } from '@/services/userService'; // Adjust path if needed
import { UserSettings } from '@/models/user'; // Adjust path if needed

// Define default settings here so the component can use them if they are missing
const defaultSettings: UserSettings = {
  notifications: { email: true, push: false, questReminders: true, achievementAlerts: true, communityUpdates: false },
  privacy: { profileVisibility: 'public', showProgress: true, showAchievements: true, allowMessages: true },
  preferences: { theme: 'lemonade', dailyGoal: 30, language: 'English' },
};

const ProfileSettings: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  // Use useCallback to prevent re-creating this function on every render
  const handleSaveSettings = useCallback(async (newSettings: UserSettings) => {
    if (!user) return;
    try {
      await updateUserSettings(user.id, newSettings);
    } catch (err) {
      console.error("Failed to save settings.", err);
      // Optionally show an error toast to the user
    }
  }, [user]);

  useEffect(() => {
    const fetchAndInitializeSettings = async () => {
      if (!user) return;

      try {
        const userData = await getUserById(user.id);

        if (userData && userData.settings) {
          // If settings exist in the DB, use them
          setSettings(userData.settings);
        } else {
          // THIS IS THE SELF-HEALING PART
          // If settings are missing, use the defaults and save them to the DB
          console.log("Settings not found, initializing with defaults and saving...");
          setSettings(defaultSettings);
          await handleSaveSettings(defaultSettings);
        }
      } catch (err) {
        console.error("Failed to load or initialize user settings.", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchAndInitializeSettings();
    }
  }, [isLoaded, user, handleSaveSettings]);


  // Generic handler for any settings change
  const handleSettingChange = <T extends keyof UserSettings>(
    section: T,
    key: keyof UserSettings[T],
    value: UserSettings[T][keyof UserSettings[T]]
  ) => {
    if (!settings) return;

    const newSettings: UserSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    };
    setSettings(newSettings); // Update UI instantly
    handleSaveSettings(newSettings); // Save to DB
  };


  if (isLoading || !settings) {
    return <div>Loading your settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">👤 Account Settings</h2>
        <UserProfile routing="path" path="/settings" />
      </div>

      {/* Notification Settings */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">🔔 Notification Settings</h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <h3 className="font-semibold text-[var(--lemonade-3)] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <button
                onClick={() => handleSettingChange('notifications', key as keyof UserSettings['notifications'], !value)}
                className={`w-12 h-6 rounded-full border-2 border-[var(--lemonade-3)] transition-colors duration-150 ${value ? 'bg-[var(--lemonade-4)]' : 'bg-[var(--lemonade-1)]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white border border-[var(--lemonade-3)] transition-transform duration-150 ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

       {/* Privacy Settings */}
       <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">🔒 Privacy Settings</h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
                <h3 className="font-semibold text-[var(--lemonade-3)]">Profile Visibility</h3>
                <select 
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value as UserSettings['privacy']['profileVisibility'])}
                    className="px-4 py-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] font-semibold"
                >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                </select>
            </div>
            {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
                    <h3 className="font-semibold text-[var(--lemonade-3)] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <button
                        onClick={() => handleSettingChange('privacy', key as keyof UserSettings['privacy'], !value)}
                        className={`w-12 h-6 rounded-full border-2 border-[var(--lemonade-3)] transition-colors duration-150 ${value ? 'bg-[var(--lemonade-4)]' : 'bg-[var(--lemonade-1)]'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white border border-[var(--lemonade-3)] transition-transform duration-150 ${value ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">⚙️ Preferences</h2>
        <div className="space-y-4">
            {/* Add your other preferences here, following the pattern */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
