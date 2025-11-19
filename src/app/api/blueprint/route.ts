import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const blueprint = await generateBlueprint(prompt);

    return NextResponse.json(blueprint);
  } catch (err: any) {
    console.error("BLUEPRINT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Blueprint failed" },
      { status: 500 }
    );
  }
}
