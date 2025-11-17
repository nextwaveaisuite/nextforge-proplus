import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Missing idea" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Classify this SaaS idea and extract app_type, description, features, ui_components."
        },
        {
          role: "user",
          content: idea
        }
      ]
    });

    const data = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      data
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
