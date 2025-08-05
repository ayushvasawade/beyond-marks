'use client';
import React, { useState } from 'react';

const ProfileSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    questReminders: true,
    achievementAlerts: true,
    communityUpdates: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'lemonade',
    difficulty: 'adaptive',
    dailyGoal: 30,
    language: 'English'
  });

  return (
    <div className="space-y-8">
      {/* Account Settings */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">👤 Account Settings</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Display Name</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Change your display name</p>
            </div>
            <button className="px-4 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
              Edit
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Email Address</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">sarah.chen@example.com</p>
            </div>
            <button className="px-4 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
              Change
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Password</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Update your password</p>
            </div>
            <button className="px-4 py-2 bg-[var(--lemonade-4)] border-2 border-[var(--lemonade-3)] rounded-xl text-white font-semibold hover:bg-[var(--lemonade-2)] hover:text-[var(--lemonade-3)] transition-colors duration-150">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">🔔 Notification Settings</h2>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div>
                <h3 className="font-semibold text-[var(--lemonade-3)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-[var(--lemonade-3)] opacity-80">
                  {key === 'email' && 'Receive email notifications'}
                  {key === 'push' && 'Receive push notifications'}
                  {key === 'questReminders' && 'Get reminded about daily quests'}
                  {key === 'achievementAlerts' && 'Get notified when you earn achievements'}
                  {key === 'communityUpdates' && 'Get updates from the community'}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`w-12 h-6 rounded-full border-2 border-[var(--lemonade-3)] transition-colors duration-150 ${
                  value ? 'bg-[var(--lemonade-4)]' : 'bg-[var(--lemonade-1)]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white border border-[var(--lemonade-3)] transition-transform duration-150 ${
                  value ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
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
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Profile Visibility</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Who can see your profile</p>
            </div>
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
              className="px-4 py-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] font-semibold"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
              <div>
                <h3 className="font-semibold text-[var(--lemonade-3)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-[var(--lemonade-3)] opacity-80">
                  {key === 'showProgress' && 'Show your learning progress to others'}
                  {key === 'showAchievements' && 'Display your achievements publicly'}
                  {key === 'allowMessages' && 'Allow other users to message you'}
                </p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                className={`w-12 h-6 rounded-full border-2 border-[var(--lemonade-3)] transition-colors duration-150 ${
                  value ? 'bg-[var(--lemonade-4)]' : 'bg-[var(--lemonade-1)]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white border border-[var(--lemonade-3)] transition-transform duration-150 ${
                  value ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-3)] mb-6">⚙️ Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Theme</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Choose your preferred theme</p>
            </div>
            <select 
              value={preferences.theme}
              onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value }))}
              className="px-4 py-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] font-semibold"
            >
              <option value="lemonade">Lemonade</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-3)]">Daily Goal (minutes)</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Set your daily learning target</p>
            </div>
            <input 
              type="number"
              value={preferences.dailyGoal}
              onChange={(e) => setPreferences(prev => ({ ...prev, dailyGoal: parseInt(e.target.value) }))}
              className="w-20 px-3 py-2 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-3)] font-semibold text-center"
              min="5"
              max="180"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border-4 border-[var(--lemonade-5)] rounded-2xl p-6 shadow-[4px_4px_0_0_var(--lemonade-5)]">
        <h2 className="text-2xl font-bold text-[var(--lemonade-5)] mb-6">⚠️ Danger Zone</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-5)] rounded-xl">
            <div>
              <h3 className="font-semibold text-[var(--lemonade-5)]">Delete Account</h3>
              <p className="text-sm text-[var(--lemonade-3)] opacity-80">Permanently delete your account and all data</p>
            </div>
            <button className="px-6 py-2 bg-[var(--lemonade-5)] border-2 border-[var(--lemonade-3)] rounded-xl text-[var(--lemonade-1)] font-semibold hover:bg-[var(--lemonade-3)] hover:text-[var(--lemonade-1)] transition-colors duration-150">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings; 