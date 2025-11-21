import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";
import { createScaffoldFromBlueprint } from "@/lib/generator";

export async function POST(req: NextRequest) {
  try {
    const { prompt, formats } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // 1. Generate blueprint from prompt + formats
    const blueprint = await generateBlueprint(prompt, formats || {});

    // 2. Build scaffold (folder structure + generated source files)
    const scaffold = await createScaffoldFromBlueprint(blueprint);

    // 3. Return JSON for UI previews
    return NextResponse.json({
      success: true,
      blueprint,
      scaffold,
    });
  } catch (error: any) {
    console.error("PREVIEW ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate preview.",
      },
      { status: 500 }
    );
  }
}
