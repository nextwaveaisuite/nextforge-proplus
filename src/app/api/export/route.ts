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

    // Add files safely
    for (const [path, content] of Object.entries(body.files)) {
      const safe =
        typeof content === "string"
          ? content
          : JSON.stringify(content ?? "");

      zip.file(path, safe);
    }

    // Generate raw uint8 array  
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // Convert to Blob (AVOIDS ALL BodyInit ISSUES)
    const zipBlob = new Blob([uint8], { type: "application/zip" });

    // Convert Blob → ReadableStream (Next.js safe)
    const stream = zipBlob.stream();

    // Send stream response (cleanest & fully typed)
    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="nextforge_app.zip"`
      }
    });

  } catch (err: any) {
    console.error("EXPORT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Export failed" },
      { status: 500 }
    );
  }
}
