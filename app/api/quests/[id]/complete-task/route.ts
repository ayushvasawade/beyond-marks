import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { completeTask, getQuestById } from "@/services/questService";
import { incrementAchievementProgress } from "@/services/achievementService";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const runtime = 'nodejs';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const taskId: string | undefined = body?.taskId;
  if (!taskId) {
    return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
  }
  try {
    const enrollment = await completeTask(userId, params.id, taskId);
    // If completion reached, award XP and increment relevant achievements
    const quest = await getQuestById(params.id);
    if (quest && enrollment.status === "completed") {
      // Add XP
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { xp: increment(quest.xp) });
      // Bump achievements by key IDs if present
      // Example: first_steps when completing any one quest; speed_learner when multiple completed.
      await incrementAchievementProgress(userId, 'first_steps', 1);
      await incrementAchievementProgress(userId, 'speed_learner', 1);
      // Category-specific achievements
      const cat = (quest.category || '').toLowerCase();
      if (cat.includes('javascript')) {
        await incrementAchievementProgress(userId, 'javascript_master', 1);
      }
      if (cat.includes('react')) {
        await incrementAchievementProgress(userId, 'react_developer', 1);
      }
    }
    return NextResponse.json({ enrollment });
  } catch {
    return NextResponse.json({ error: "Failed to complete task" }, { status: 500 });
  }
}

