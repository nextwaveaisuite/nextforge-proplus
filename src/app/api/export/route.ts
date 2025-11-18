import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.files || typeof body.files !== "object") {
      return NextResponse.json(
        { success: false, message: "Missing files object." },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (const [filename, content] of Object.entries(body.files)) {
      zip.file(filename, content as string);
    }

    // Uint8Array output
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // Convert Uint8Array → NEW ArrayBuffer (safe)
    const safeArrayBuffer = uint8.slice().buffer;

    return new NextResponse(safeArrayBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="nextforge_app.zip"`,
      },
    });
  } catch (err: any) {
    console.error("Export API Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Unable to export ZIP" },
      { status: 500 }
    );
  }
}
