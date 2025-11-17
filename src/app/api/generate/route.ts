// src/app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generateSaaS } from "@/lib/ai-engine";
import { createZipFromFiles } from "@/lib/zip-builder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await generateSaaS(body);

    if (!result.success) {
      return NextResponse.json(result);
    }

    let zipBase64 = null;

    if (result.files && typeof result.files === "object") {
      zipBase64 = await createZipFromFiles(result.files);
    }

    return NextResponse.json({
      ...result,
      zip: zipBase64
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
