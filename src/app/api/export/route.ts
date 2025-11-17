import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const zip = new JSZip();

    // Add files
    Object.entries(body.files || {}).forEach(([path, content]) => {
      zip.file(path, content);
    });

    // Generate as Uint8Array
    const zipContent = await zip.generateAsync({ type: "uint8array" });

    // Convert Uint8Array → Buffer (Node compatible)
    const buffer = Buffer.from(zipContent);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextforge_app.zip"
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
