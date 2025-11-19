import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.files) {
      return NextResponse.json(
        { error: "No files provided." },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    // Safe file loop
    for (const [path, content] of Object.entries(body.files)) {
      const safe =
        typeof content === "string"
          ? content
          : JSON.stringify(content ?? "");
      zip.file(path, safe);
    }

    // Generate a Uint8Array ZIP
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // Convert Uint8Array → guaranteed ArrayBuffer (NOT SharedArrayBuffer)
    const realBuffer = uint8.buffer.slice(
      uint8.byteOffset,
      uint8.byteOffset + uint8.byteLength
    );

    // Create blob using ONLY ArrayBuffer (safe BlobPart)
    const zipBlob = new Blob([realBuffer], {
      type: "application/zip",
    });

    // Convert blob → stream
    const stream = zipBlob.stream();

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="nextforge_app.zip"',
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
