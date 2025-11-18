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
        { role: "system", content: "Return a clean JSON blueprint for a SaaS tool." },
        { role: "user", content: body.prompt }
      ],
      response_format: { type: "json_object" }
    });

    const responseJson = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json({
      success: true,
      blueprint: responseJson
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Blueprint generation failed"
      },
      { status: 500 }
    );
  }
}
