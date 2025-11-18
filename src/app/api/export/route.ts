export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const zip = new JSZip();

    // Safely add files
    if (body.files && typeof body.files === "object") {
      for (const [path, content] of Object.entries(body.files)) {
        zip.file(path, String(content ?? ""));
      }
    }

    const zipContent = await zip.generateAsync({ type: "uint8array" });

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextforge_app.zip"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Export failed" },
      { status: 500 }
    );
  }
}
