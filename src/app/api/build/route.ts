import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";
import { createZipFromBlueprint } from "@/lib/zip-builder";

export async function POST(req: Request) {
  try {
    const { prompt, formats } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Prompt cannot be empty." },
        { status: 400 }
      );
    }

    // Step 1: Generate the blueprint using OpenAI
    const blueprint = await generateBlueprint(prompt, formats);

    // Step 2: Convert blueprint into download-ready ZIPs
    const zipFiles = await createZipFromBlueprint(blueprint, formats);

    return NextResponse.json({
      success: true,
      blueprint,
      zipFiles,
    });
  } catch (err: any) {
    console.error("Build error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to build application." },
      { status: 500 }
    );
  }
}
