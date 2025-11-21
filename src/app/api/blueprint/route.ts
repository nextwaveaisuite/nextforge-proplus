import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

/**
 * BLUEPRINT API (PREVIEW MODE)
 * Generates only the blueprint JSON (no ZIP).
 *
 * Response:
 * {
 *   success: true,
 *   blueprint: {...},
 *   formats: {...}
 * }
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = body?.prompt;
    const formats = body?.formats || {
      nextjs: true,
      microapp: true,
      backend: false,
      flutter: false,
      api: false,
    };

    // Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Generate the blueprint
    const blueprint = await generateBlueprint(prompt, formats);

    if (!blueprint) {
      return NextResponse.json(
        { success: false, error: "Blueprint generation failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        blueprint,
        formats,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("BLUEPRINT API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
