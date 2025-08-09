import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { enrollInQuest } from "@/services/questService";

export const runtime = 'nodejs';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const enrollment = await enrollInQuest(userId, params.id);
    return NextResponse.json({ enrollment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to enroll" }, { status: 500 });
  }
}

