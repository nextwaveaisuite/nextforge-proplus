import { NextRequest, NextResponse } from "next/server";

/**
 * STEP 3.2 — DIRECT VERCEL DEPLOYMENT (Stub Version)
 * This prepares a Vercel API deploy request payload.
 * In production, you will pass a VERCEL_TOKEN via environment variable.
 */

export async function POST(req: NextRequest) {
  try {
    const { files, projectName, vercelToken } = await req.json();

    if (!files || !projectName) {
      return NextResponse.json(
        { error: "Missing files or projectName" },
        { status: 400 }
      );
    }

    if (!vercelToken) {
      return NextResponse.json(
        { error: "Missing vercelToken" },
        { status: 400 }
      );
    }

    // IMPORTANT:
    // This is a stub. You will plug in real Vercel API calls later.
    // Here we return a ready-to-send Vercel deploy payload.

    const payload = {
      name: projectName,
      files: Object.keys(files).map((filePath) => ({
        file: filePath,
        data: Buffer.from(files[filePath]).toString("base64"),
      })),
      target: "production",
    };

    return NextResponse.json({
      success: true,
      message: "Deployment payload prepared. Send this to Vercel API.",
      vercel_api_endpoint: "https://api.vercel.com/v13/deployments",
      payload
    });

  } catch (error) {
    console.error("VERCEL DEPLOY ERROR:", error);
    return NextResponse.json(
        { error: "Failed to create Vercel deployment payload." },
        { status: 500 }
    );
  }
}
