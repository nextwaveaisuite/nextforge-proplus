import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/src/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json(
        { error: "No idea provided" },
        { status: 400 }
      );
    }

    const prompt = `
You are the Classification Engine for NextForge Pro+.
Your task: Read the user's app idea and return a strict JSON response only.

Use this schema:

{
  "app_type": "",
  "complexity": "",
  "features": [],
  "ui_components": [],
  "routes": [],
  "backend": {
    "requires_auth": false,
    "requires_crud": false,
    "requires_ai": false,
    "requires_stripe": false
  },
  "description": ""
}

Classify this idea:
"${idea}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const text = completion.choices[0].message.content;
    const json = JSON.parse(text);

    return NextResponse.json(json);

  } catch (err) {
    console.error("CLASSIFIER AI ERROR:", err);
    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
}
