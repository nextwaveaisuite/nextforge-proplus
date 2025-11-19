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

    // Generate a Uint8Array (this is safe for Response)
    const uint8 = await zip.generateAsync({ type: "uint8array" });

    return new Response(uint8, {
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
