import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const { files } = await req.json();

    if (!files || typeof files !== "object") {
      return NextResponse.json(
        { error: "Invalid file payload" },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    // Add files to ZIP structure
    for (const filePath in files) {
      zip.file(filePath, files[filePath]);
    }

    // Generate ZIP buffer
    const zipContent = await zip.generateAsync({ type: "uint8array" });

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextforge_app.zip",
      },
    });
  } catch (err) {
    console.error("ZIP EXPORT ERROR:", err);
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500 }
    );
  }
}
