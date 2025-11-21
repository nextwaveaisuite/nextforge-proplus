import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = body?.prompt;
    const formats = body?.formats || {
      nextjs: true,
      microapp: true,
      backend: false,
      flutter: false,
    };

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Corrected: generateBlueprint now takes 2 args
    const blueprint = await generateBlueprint(prompt, formats);

    return NextResponse.json({
      success: true,
      blueprint,
      formats,
    });
  } catch (err: any) {
    console.error("Blueprint API Error:", err);

    return NextResponse.json(
      { success: false, error: "Blueprint generation failed." },
      { status: 500 }
    );
  }
}
