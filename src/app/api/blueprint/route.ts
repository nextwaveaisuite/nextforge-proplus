import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.description || body.description.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Invalid description" },
        { status: 400 }
      );
    }

    const prompt = `
Return ONLY pure JSON in this exact format:
{
  "files": {
     "path/to/file": "file content"
  }
}
Description: ${body.description}
`;

    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const raw = completion.output_text;
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in AI output" },
        { status: 500 }
      );
    }

    if (!parsed.files || typeof parsed.files !== "object") {
      return NextResponse.json(
        { success: false, error: "Blueprint missing files" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      files: parsed.files,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error", details: `${err}` },
      { status: 500 }
    );
  }
}
