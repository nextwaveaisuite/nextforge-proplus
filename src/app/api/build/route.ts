import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";
import { buildProjectZip } from "@/lib/zip-builder";

/**
 * BUILD API
 * Turns a user prompt + selected formats into:
 * 1. AI-generated blueprint JSON
 * 2. A downloadable Base64 ZIP containing the generated project
 *
 * Response:
 * {
 *   success: true,
 *   blueprint: {...},
 *   zip: "<base64-string>",
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

    // STEP 1 — AI Generates the blueprint
    const blueprint = await generateBlueprint(prompt, formats);

    if (!blueprint) {
      return NextResponse.json(
        { success: false, error: "Blueprint generation failed." },
        { status: 500 }
      );
    }

    // STEP 2 — Convert blueprint → ZIP file
    const zipBase64 = await buildProjectZip(blueprint);

    if (!zipBase64) {
      return NextResponse.json(
        { success: false, error: "ZIP generation failed." },
        { status: 500 }
      );
    }

    // SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        blueprint,
        zip: zipBase64,
        formats,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("BUILD API ERROR:", err);

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
