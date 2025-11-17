import { NextRequest, NextResponse } from "next/server";
import { runBlueprint } from "@/lib/ai-engine";
import { createZipFromFiles } from "@/lib/zip-builder";

// Define what a correct AI response looks like
interface FileMap {
  [path: string]: string | Uint8Array | ArrayBuffer;
}

interface AIResultSuccess {
  success: true;
  files: FileMap;
  message?: string;
}

interface AIResultFail {
  success: false;
  message: string;
}

type AIResult = AIResultSuccess | AIResultFail;

function isSuccess(result: AIResult): result is AIResultSuccess {
  return result.success === true && typeof result.files === "object";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result: AIResult = await runBlueprint(body);

    let zipBase64: string | null = null;

    // Type-safe access
    if (isSuccess(result)) {
      zipBase64 = await createZipFromFiles(result.files);
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      zip: zipBase64,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
