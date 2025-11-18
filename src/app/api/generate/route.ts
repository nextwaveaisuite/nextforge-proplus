import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/openai";
import { createZipFromFiles } from "@/lib/zip-builder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Generate full SaaS scaffold files as a JSON object. Keys = filenames, values = file content. Input: ${JSON.stringify(
        body,
        null,
        2
      )}`,
    });

    const text = response.output_text || "";
    let parsed: any = null;

    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "AI returned invalid JSON. Try again or adjust your prompt.",
        },
        { status: 400 }
      );
    }

    if (!parsed.files || typeof parsed.files !== "object") {
      return NextResponse.json(
        {
          success: false,
          message:
            "AI response missing `.files` object. Cannot generate ZIP.",
        },
        { status: 400 }
      );
    }

    const zipBase64 = await createZipFromFiles(parsed.files);

    return NextResponse.json({
      success: true,
      message: "SaaS generated successfully.",
      zipBase64,
    });
  } catch (err: any) {
    console.error("Generate API Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Unable to generate SaaS.",
      },
      { status: 500 }
    );
  }
}
