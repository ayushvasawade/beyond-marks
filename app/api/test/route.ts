import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "API is working!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ 
      message: "POST request received",
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to parse request body",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 400 });
  }
} 