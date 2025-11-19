import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.files) {
      return NextResponse.json(
        { error: "No files provided." },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (const [path, content] of Object.entries(body.files)) {
      zip.file(path, content ?? "");
    }

    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // convert Uint8Array → ArrayBuffer → Node.js response
    const arrayBuffer = uint8.buffer.slice(
      uint8.byteOffset,
      uint8.byteOffset + uint8.byteLength
    );

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="nextforge_app.zip"`,
      },
    });
  } catch (err: any) {
    console.error("EXPORT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Export failed" },
      { status: 500 }
    );
  }
}
.
