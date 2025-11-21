// src/app/api/scaffold/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const { prompt, formats } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Default formats if not provided
    const selectedFormats = formats || {
      nextjs: true,
      microapp: true,
      backend: false,
      flutter: false,
    };

    const blueprint = await generateBlueprint(prompt, selectedFormats);

    return NextResponse.json({
      success: true,
      blueprint,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Blueprint generation failed" },
      { status: 500 }
    );
  }
}
