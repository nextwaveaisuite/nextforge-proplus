import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";
import { createScaffoldFromBlueprint } from "@/lib/generator";
import { createZipFromScaffold } from "@/lib/zip-builder";

export async function POST(req: NextRequest) {
  try {
    const { prompt, formats } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // 1. Generate the blueprint using AI engine
    const blueprint = await generateBlueprint(prompt, formats || {});

    // 2. Create scaffold folder/file structure from blueprint
    const scaffold = await createScaffoldFromBlueprint(blueprint);

    // 3. Convert scaffold into a downloadable ZIP
    const zipBuffer = await createZipFromScaffold(scaffold);

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="nextforge-build.zip"',
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
