'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { getUserById } from '@/services/userService';
import type { User as FsUser } from '@/models/user';

const ProfileHeader: React.FC = () => {
  const { user: clerkUser } = useUser();
  const [fsUser, setFsUser] = useState<FsUser | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!clerkUser?.id) return;
      const u = await getUserById(clerkUser.id);
      setFsUser(u);
    };
    load();
  }, [clerkUser?.id]);

  const displayName = useMemo(() => {
    const f = fsUser?.firstName || clerkUser?.firstName || '';
    const l = fsUser?.lastName || clerkUser?.lastName || '';
    const full = `${f} ${l}`.trim();
    return full || clerkUser?.fullName || 'User';
  }, [fsUser, clerkUser]);

  const email = useMemo(() => {
    return (
      fsUser?.email ||
      clerkUser?.primaryEmailAddress?.emailAddress ||
      clerkUser?.emailAddresses?.[0]?.emailAddress ||
      ''
    );
  }, [fsUser, clerkUser]);

  const xp = fsUser?.xp ?? 0;
  const level = Math.max(1, Math.floor(xp / 200) + 1);
  const joinDate = useMemo(() => {
    const ts: any = fsUser?.createdAt as any;
    const d: Date | null = ts && typeof ts.toDate === 'function' ? ts.toDate() : null;
    if (!d) return '';
    try {
      return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
    } catch {
      return '';
    }
  }, [fsUser]);
  const imageUrl = fsUser?.imageUrl || clerkUser?.imageUrl || '';

  return (
    <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-8 mb-8 shadow-[4px_4px_0_0_var(--lemonade-3)]">
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-4)] rounded-full overflow-hidden flex items-center justify-center text-4xl">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span>{(displayName || 'U').charAt(0)}</span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--lemonade-4)] border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{level}</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-[var(--lemonade-3)] mb-2">{displayName}</h1>
            <p className="text-sm text-[var(--lemonade-3)] opacity-80 mb-2">{email}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">⭐</span>
                <span className="text-sm font-semibold text-[var(--lemonade-3)]">Level {level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">🎯</span>
                <span className="text-sm font-semibold text-[var(--lemonade-3)]">{xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--lemonade-4)]">📅</span>
                {joinDate && (
                  <span className="text-sm font-semibold text-[var(--lemonade-3)]">Joined {joinDate}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio */}
        <div className="flex-1">
          {/* Optional bio field could be added to Firestore; using a placeholder until then */}
          <p className="text-[var(--lemonade-3)] leading-relaxed">Welcome to your profile.</p>
        </div>
        
        {/* Sign Out Button */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-[var(--lemonade-2)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-3)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
              Back to Dashboard
            </button>
          </Link>
          <SignOutButton redirectUrl="/">
            <button className="px-6 py-3 bg-[var(--lemonade-5)] border-4 border-[var(--lemonade-3)] rounded-xl font-bold text-lg text-[var(--lemonade-1)] shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 