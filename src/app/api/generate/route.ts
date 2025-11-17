import { NextRequest, NextResponse } from "next/server";
import { runBlueprint } from "@/lib/ai-engine";
import { createZipFromFiles } from "@/lib/zip-builder";
import { AIResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = (await runBlueprint(body)) as AIResult;

    let zipBase64: string | null = null;

    if (result.success === true && result.files && typeof result.files === "object") {
      zipBase64 = await createZipFromFiles(result.files);
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      zip: zipBase64,
    });

  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e?.message || "API error" },
      { status: 500 }
    );
  }
}
