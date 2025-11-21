// src/app/api/blueprint/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // REQUIRED: new signature now needs 2 arguments
    const blueprint = await generateBlueprint(prompt, {
      nextjs: true,
      microapp: true,
      backend: false,
      flutter: false,
    });

    return NextResponse.json(blueprint);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate blueprint" },
      { status: 500 }
    );
  }
}
