// src/app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generateSaaS } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await generateSaaS(body);

    return NextResponse.json(response);

  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
