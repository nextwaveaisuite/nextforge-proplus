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

    // Add files to ZIP safely
    for (const [path, content] of Object.entries(body.files)) {
      const safe =
        typeof content === "string"
          ? content
          : JSON.stringify(content ?? "");
      zip.file(path, safe);
    }

    // Uint8Array ZIP output
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // 🔥 ABSOLUTELY SAFE ARRAYBUFFER REBUILD (pure ArrayBuffer)
    const pureBuffer = new ArrayBuffer(uint8.length);
    new Uint8Array(pureBuffer).set(uint8);

    // Blob always accepts real ArrayBuffer
    const zipBlob = new Blob([pureBuffer], {
      type: "application/zip",
    });

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
