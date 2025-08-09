import { NextResponse } from "next/server";
import { createQuest, getAllQuests } from "@/services/questService";
import type { QuestTask } from "@/models/quest";

export async function GET() {
  try {
    let quests = await getAllQuests();
    if (quests.length === 0 && (process.env.NODE_ENV !== 'production' || process.env.AUTO_SEED_QUESTS === 'true')) {
      const SAMPLE_TASKS: QuestTask[] = [
        { id: "setup", title: "Project setup", description: "Install deps and run dev server" },
        { id: "hello", title: "Hello component", description: "Create a simple component" },
        { id: "commit", title: "Commit changes", description: "Commit your work to git" },
      ];
      const SEED_QUESTS = [
        {
          id: "getting_started_react",
          title: "Getting Started with React",
          description: "Build and run your first React component",
          category: "react",
          difficulty: "beginner" as const,
          xp: 100,
          tasks: SAMPLE_TASKS,
          tags: ["react", "basics"],
          isActive: true,
        },
        {
          id: "javascript_fundamentals",
          title: "JavaScript Fundamentals",
          description: "Practice core JS concepts",
          category: "javascript",
          difficulty: "beginner" as const,
          xp: 150,
          tasks: [
            { id: "vars", title: "Variables" },
            { id: "loops", title: "Loops" },
            { id: "functions", title: "Functions" },
          ],
          tags: ["javascript", "basics"],
          isActive: true,
        },
      ];
      for (const q of SEED_QUESTS) {
        await createQuest(q as any);
      }
      quests = await getAllQuests();
    }
    return NextResponse.json({ quests });
  } catch {
    return NextResponse.json({ error: "Failed to load quests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  // Optional admin create using a simple shared secret
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = (await req.headers.get("x-admin-secret")) || undefined;
  if (!adminSecret || provided !== adminSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    await createQuest(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create quest" }, { status: 500 });
  }
}

