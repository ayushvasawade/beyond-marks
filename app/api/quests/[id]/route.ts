import { NextResponse } from "next/server";
import { getQuestById, updateQuest } from "@/services/questService";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const quest = await getQuestById(params.id);
  if (!quest) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ quest });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const adminSecret = process.env.ADMIN_SECRET;
  const provided = (await req.headers.get("x-admin-secret")) || undefined;
  if (!adminSecret || provided !== adminSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await req.json();
    await updateQuest(params.id, body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

