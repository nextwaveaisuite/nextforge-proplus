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

    // Get Uint8Array
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    // Create SAFE ArrayBuffer (copy into new buffer)
    const safeBuffer = new ArrayBuffer(uint8.length);
    const safeView = new Uint8Array(safeBuffer);
    safeView.set(uint8);

    // Create Blob from safe ArrayBuffer
    const blob = new Blob([safeBuffer], {
      type: "application/zip",
    });

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="project.zip"',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
