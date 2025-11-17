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

    // Add each file safely
    Object.entries(body.files).forEach(([path, content]) => {
      if (!content) content = "";

      zip.file(
        path,
        content as string | Uint8Array | ArrayBuffer
      );
    });

    // Generate ZIP (Uint8Array)
    const zipBytes = await zip.generateAsync({ type: "uint8array" });

    // Convert Uint8Array → Buffer (Node-compatible)
    const buffer = Buffer.from(zipBytes);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          "attachment; filename=nextforge_app.zip",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
