import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing MISTRAL_API_KEY" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const prompt: string = body?.prompt || "";
    const context: string = body?.context || "";
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: "You are an AI mentor helping with coding quests. Provide concise, actionable guidance." },
      { role: "user", content: `Context:\n${context}\n\nQuestion:\n${prompt}` },
    ];

    const resp = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages,
        temperature: 0.3,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json({ error: `Mistral error: ${txt}` }, { status: 500 });
    }
    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content || "";
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: "Failed to get mentor response" }, { status: 500 });
  }
}

