"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface QuestListItem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  xp: number;
  tags: string[];
}

export default function QuestListPage() {
  const [quests, setQuests] = useState<QuestListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/quests", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load");
        setQuests(data.quests || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-6">Loading quests...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-4xl font-bold text-[var(--lemonade-3)]">Quests</h1>
      {quests.length === 0 && <div className="text-[var(--lemonade-3)] opacity-80">No quests available yet.</div>}
      <ul className="space-y-4">
        {quests.map((q) => (
          <li key={q.id} className="bg-white border-4 border-[var(--lemonade-3)] rounded-3xl p-6 shadow-[4px_4px_0_0_var(--lemonade-3)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[var(--lemonade-3)]">{q.title}</h2>
                <p className="text-sm opacity-80 text-[var(--lemonade-3)]">{q.description}</p>
              </div>
              <div className="text-sm text-right">
                <div>XP: {q.xp}</div>
                <div className="uppercase text-xs">{q.difficulty}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {q.tags?.map((t) => (
                <span key={t} className="text-xs bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-full px-3 py-1 font-semibold text-[var(--lemonade-3)]">{t}</span>
              ))}
            </div>
            <div className="mt-4">
              <Link className="inline-block px-5 py-2 bg-[var(--lemonade-4)] text-white rounded-2xl border-4 border-[var(--lemonade-3)] font-bold shadow-[4px_4px_0_0_var(--lemonade-3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--lemonade-3)] transition-all duration-150" href={`/quest/${q.id}`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
