import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const blueprint = await generateBlueprint(prompt);

    return NextResponse.json({ blueprint });
  } catch (err) {
    console.error("Build error:", err);
    return NextResponse.json(
      { error: "Internal build failure" },
      { status: 500 }
    );
  }
}
