export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = OpenAI();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Classify the user's input into a known SaaS category." },
        { role: "user", content: body.prompt }
      ],
      response_format: { type: "json_object" }
    });

    const responseJson = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json({
      success: true,
      category: responseJson.category || "uncategorized"
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Classification failed"
      },
      { status: 500 }
    );
  }
}
