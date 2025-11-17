import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

/**
 * STEP 2.4 — ZIP EXPORT ENGINE
 * Takes generated files → returns ZIP (Base64)
 */

export async function POST(req: NextRequest) {
  try {
    const { files } = await req.json();

    if (!files || typeof files !== "object") {
      return NextResponse.json(
        { error: "Missing 'files' in request body" },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    // Add each generated file to ZIP
    for (const filePath in files) {
      const content = files[filePath] || "";
      zip.file(filePath, content);
    }

    const zipBlob = await zip.generateAsync({ type: "base64" });

    return NextResponse.json({
      success: true,
      zip_base64: zipBlob
    });

  } catch (error) {
    console.error("ZIP EXPORT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create ZIP export." },
      { status: 500 }
    );
  }
}
