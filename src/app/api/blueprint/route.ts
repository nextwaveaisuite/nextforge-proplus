import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Generate a blueprint JSON structure for a SaaS tool using this input:\n${JSON.stringify(
        body,
        null,
        2
      )}`,
    });

    return NextResponse.json({
      success: true,
      blueprint: response.output_text || "",
    });
  } catch (err: any) {
    console.error("Blueprint API Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Blueprint generation failed.",
      },
      { status: 500 }
    );
  }
}
