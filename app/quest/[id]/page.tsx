"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

interface QuestDetail {
  id: string;
  title: string;
  description: string;
  xp: number;
  tasks: { id: string; title: string; description?: string }[];
}

interface Enrollment {
  userId: string;
  questId: string;
  status: "enrolled" | "completed";
  completedTaskIds: string[];
}

export default function QuestDetailPage() {
  const params = useParams();
  const questId = String(params?.id || "");
  const [quest, setQuest] = useState<QuestDetail | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isEnrolled = !!enrollment;

  useEffect(() => {
    if (!questId) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/quests/${questId}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error((data?.error as string) || "Failed to load quest");
        setQuest(data.quest);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [questId]);

  const refreshEnrollment = useCallback(async () => {
    try {
      // naive approach: attempt to read enrollment by calling a task endpoint with no-op is not ideal.
      // Instead, re-enroll which will no-op if exists.
      const res = await fetch(`/api/quests/${questId}/enroll`, { method: "POST" });
      if (res.status === 401) {
        setEnrollment(null);
        return;
      }
      const data = await res.json();
      if (res.ok) setEnrollment(data.enrollment);
    } catch {
      // ignore
    }
  }, [questId]);

  useEffect(() => {
    if (questId) {
      refreshEnrollment();
    }
  }, [questId, refreshEnrollment]);

  const handleEnroll = async () => {
    const res = await fetch(`/api/quests/${questId}/enroll`, { method: "POST", credentials: 'include' });
    const data = await res.json();
    if (res.ok) setEnrollment(data.enrollment);
    else if (res.status === 401) {
      const returnTo = encodeURIComponent(`/learning-lab/quest/${questId}`);
      window.location.href = `/sign-in?redirectUrl=${returnTo}`;
    } else {
      setError((data?.error as string) || "Failed to enroll");
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    const res = await fetch(`/api/quests/${questId}/complete-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ taskId }),
    });
    const data = await res.json();
    if (res.ok) setEnrollment(data.enrollment);
    else setError((data?.error as string) || "Failed to complete task");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!quest) return <div className="p-6">Quest not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
        <h1 className="text-3xl font-bold text-[var(--lemonade-3)]">{quest.title}</h1>
        <div className="opacity-80 mt-2 text-[var(--lemonade-3)]">{quest.description}</div>
        <div className="mt-2 font-semibold">XP: {quest.xp}</div>

        {!isEnrolled && (
          <button className="mt-4 px-6 py-3 bg-[var(--lemonade-4)] text-white rounded-2xl border-4 border-[var(--lemonade-3)] font-bold shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150" onClick={handleEnroll}>
            Enroll
          </button>
        )}
        {isEnrolled && (
          <a href={`/learning-lab/quest/${questId}`} className="inline-block mt-4 px-6 py-3 bg-[var(--lemonade-2)] text-[var(--lemonade-3)] rounded-2xl border-4 border-[var(--lemonade-3)] font-bold shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150">Open in Learning Lab</a>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <ul className="mt-2 space-y-2">
          {quest.tasks?.map((t) => {
            const done = enrollment?.completedTaskIds?.includes(t.id);
            return (
              <li key={t.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-2xl p-4 shadow-[4px_4px_0_0_var(--lemonade-3)] flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.title}</div>
                  {t.description && <div className="text-sm opacity-80">{t.description}</div>}
                </div>
                <div>
                  {done ? (
                    <span className="text-green-700 font-semibold">Completed</span>
                  ) : (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-2xl border-4 border-[var(--lemonade-3)] font-bold hover:bg-green-500" onClick={() => handleCompleteTask(t.id)}>
                      Mark complete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

