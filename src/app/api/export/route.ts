import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.files) {
      return new Response(
        JSON.stringify({ error: "No files provided." }),
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (const [path, content] of Object.entries(body.files)) {
      zip.file(path, typeof content === "string" ? content : "");
    }

    // Uint8Array
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // Convert to Blob — TypeScript-safe AND browser-safe
    const blob = new Blob([uint8], {
      type: "application/zip"
    });

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="project.zip"'
      }
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
