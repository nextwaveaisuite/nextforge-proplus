import { NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt." },
        { status: 400 }
      );
    }

    const blueprint = await generateBlueprint(prompt);

    return NextResponse.json(
      { success: true, blueprint },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("SCAFFOLD ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed generating scaffold." },
      { status: 500 }
    );
  }
}
