import { NextResponse } from "next/server";
import { seedAchievementDefinitions } from "@/services/achievementService";

export async function POST(req: Request) {
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = req.headers.get("x-admin-secret") || undefined;
  if (adminSecret && provided !== adminSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    await seedAchievementDefinitions();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}

