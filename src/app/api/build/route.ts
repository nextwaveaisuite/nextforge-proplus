import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";
import { createZipFromBlueprint } from "@/lib/zip-builder";

export async function POST(req: NextRequest) {
  try {
    const { prompt, formats } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Generate full blueprint using your upgraded dual-format engine
    const blueprint = await generateBlueprint(prompt, formats || {});

    // Build ZIP bundle (Next.js + Micro App + optional formats)
    const zipBuffer = await createZipFromBlueprint(blueprint);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=app.zip",
      },
    });
  } catch (error: any) {
    console.error("BUILD ROUTE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Build failed.",
      },
      { status: 500 }
    );
  }
}
