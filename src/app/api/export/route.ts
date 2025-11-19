import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.files || typeof body.files !== "object") {
      return NextResponse.json(
        { success: false, error: "No files provided" },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (const [path, content] of Object.entries(body.files)) {
      zip.file(path, content || "");
    }

    const uint8 = await zip.generateAsync({ type: "uint8array" });

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="nextforge_app.zip"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "ZIP generation failed", details: `${err}` },
      { status: 500 }
    );
  }
}
