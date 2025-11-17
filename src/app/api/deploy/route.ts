import { NextRequest, NextResponse } from "next/server";

/**
 * STEP 3 — DEPLOYMENT ENGINE (Stub Version)
 * This creates a deployment-ready payload but does NOT deploy yet.
 */

export async function POST(req: NextRequest) {
  try {
    const { files, projectName } = await req.json();

    if (!files) {
      return NextResponse.json(
        { error: "Missing generated files" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const vercelReady = {
      projectName: projectName || "nextforge-app-" + timestamp,
      createdAt: timestamp,
      files,
      vercel_json: {
        version: 2,
        builds: [{ src: "package.json", use: "@vercel/next" }]
      }
    };

    return NextResponse.json({
      success: true,
      deploy_payload: vercelReady
    });

  } catch (error) {
    console.error("DEPLOY ENGINE ERROR:", error);
    return NextResponse.json(
      { error: "Failed generating deploy payload." },
      { status: 500 }
    );
  }
}
