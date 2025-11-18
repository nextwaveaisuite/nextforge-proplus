export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { runBlueprint } from "@/lib/ai-engine";
import { createZipFromFiles } from "@/lib/zip-builder";
import type { AIResult } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result: AIResult = await runBlueprint(body);

    let zipBase64: string | null = null;

    if (result.success && result.files && typeof result.files === "object") {
      zipBase64 = await createZipFromFiles(result.files);
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      zipBase64,
      files: result.files ?? null
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
        zipBase64: null,
        files: null
      },
      { status: 500 }
    );
  }
}
