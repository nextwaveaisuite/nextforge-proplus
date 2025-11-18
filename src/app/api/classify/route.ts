import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Classify this SaaS idea:\n${JSON.stringify(body, null, 2)}`,
    });

    return NextResponse.json({
      success: true,
      classification: response.output_text || "",
    });
  } catch (err: any) {
    console.error("Classify API Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Idea classification failed.",
      },
      { status: 500 }
    );
  }
}
