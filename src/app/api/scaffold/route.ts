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

    // Use your unified dual-format AI engine
    const blueprint = await generateBlueprint(prompt, formats || {});

    // Scaffold = file structure, folder tree, base index pages, utilities, etc.
    const scaffold = await createScaffoldFromBlueprint(blueprint);

    return NextResponse.json(
      {
        success: true,
        scaffold,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("SCAFFOLD ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate scaffold.",
      },
      { status: 500 }
    );
  }
}
