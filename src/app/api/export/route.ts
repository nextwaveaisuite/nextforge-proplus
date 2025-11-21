import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { generateBlueprint } from "@/lib/ai-engine";

export const runtime = "nodejs"; // ZIP requires Node runtime, NOT Edge

/**
 * EXPORT API
 * Converts a generated blueprint into a downloadable ZIP file.
 *
 * POST body:
 * {
 *   "prompt": "Create a SaaS tool...",
 *   "formats": {
 *     nextjs: true,
 *     microapp: true,
 *     backend: false,
 *     flutter: false,
 *     api: false
 *   }
 * }
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = body?.prompt;
    const formats = body?.formats || {
      nextjs: true,
      microapp: true,
      backend: false,
      flutter: false,
      api: false,
    };

    // Validate
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    // Generate blueprint (with formats argument)
    const blueprint = await generateBlueprint(prompt, formats);

    if (!blueprint) {
      return NextResponse.json(
        { success: false, error: "Failed to generate blueprint." },
        { status: 500 }
      );
    }

    // Create ZIP
    const zip = new JSZip();

    // Add main blueprint.json
    zip.file("blueprint.json", JSON.stringify(blueprint, null, 2));

    // Add each selected export format
    if (formats.nextjs && blueprint.nextjs) {
      zip.file(
        "nextjs/README.txt",
        "This folder contains generated Next.js scaffolding."
      );
      Object.entries(blueprint.nextjs).forEach(([name, content]) => {
        zip.file(`nextjs/${name}`, content as string);
      });
    }

    if (formats.microapp && blueprint.microapp) {
      zip.file(
        "microapp/README.txt",
        "Generated micro-app starter files."
      );
      Object.entries(blueprint.microapp).forEach(([name, content]) => {
        zip.file(`microapp/${name}`, content as string);
      });
    }

    if (formats.backend && blueprint.backend) {
      zip.file(
        "backend/README.txt",
        "Generated backend boilerplate files."
      );
      Object.entries(blueprint.backend).forEach(([name, content]) => {
        zip.file(`backend/${name}`, content as string);
      });
    }

    // Convert zip to buffer
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipContent, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextforge-export.zip",
      },
    });
  } catch (err: any) {
    console.error("EXPORT API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Unexpected server error.",
        details: err?.message || null,
      },
      { status: 500 }
    );
  }
}
