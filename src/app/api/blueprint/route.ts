import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/src/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const classifier = await req.json();

    if (!classifier || !classifier.app_type) {
      return NextResponse.json(
        { error: "Invalid classifier input" },
        { status: 400 }
      );
    }

    const prompt = `
You are the Blueprint Engine for NextForge Pro+.
Using the following classifier output, generate a COMPLETE, detailed build blueprint.

CLASSIFIER INPUT:
${JSON.stringify(classifier, null, 2)}

Return ONLY JSON with this structure:

{
  "summary": "",
  "frontend": {
    "pages": [],
    "components": [],
    "styles": []
  },
  "backend": {
    "api_routes": [],
    "auth": false,
    "stripe": false
  },
  "files_to_create": [],
  "notes": {
    "requires_ai_key": false,
    "next_step": ""
  }
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const json = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(json);

  } catch (err) {
    console.error("BLUEPRINT AI ERROR:", err);
    return NextResponse.json(
      { error: "Blueprint generation failed" },
      { status: 500 }
    );
  }
}
