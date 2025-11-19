import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.files) {
      return new Response(
        JSON.stringify({ error: "No files provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const zip = new JSZip();

    for (const [path, content] of Object.entries(body.files)) {
      zip.file(path, typeof content === "string" ? content : "");
    }

    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // ✅ Convert Uint8Array → ArrayBuffer (Response accepts this)
    const buffer = uint8.buffer;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=app.zip"
      }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Export failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
