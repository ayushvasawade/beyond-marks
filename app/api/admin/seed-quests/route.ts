import { NextResponse } from "next/server";
import { createQuest } from "@/services/questService";
import { QuestTask } from "@/models/quest";

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
    difficulty: "beginner",
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
    difficulty: "beginner",
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

export async function POST(req: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = req.headers.get("x-admin-secret") || undefined;
  if (adminSecret && provided !== adminSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    for (const q of SEED_QUESTS) {
      await createQuest(q as any);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}

