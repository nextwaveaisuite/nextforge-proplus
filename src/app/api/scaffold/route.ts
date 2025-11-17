import { NextRequest, NextResponse } from "next/server";

/**
 * File Structure Generator for NextForge AI Pro+
 * STEP 2.2 — Generates folders & empty files as JSON
 */

export async function POST(req: NextRequest) {
  try {
    const { app_type } = await req.json();

    if (!app_type) {
      return NextResponse.json(
        { error: "Missing app_type" },
        { status: 400 }
      );
    }

    // Define base scaffold
    const baseStructure = {
      "app/page.tsx": "",
      "app/api/generate/route.ts": "",
      "components/Header.tsx": "",
      "components/Footer.tsx": "",
      "styles/app.css": ""
    };

    // App-type-specific files
    const typeMap: any = {
      "text-generator": {
        "app/generator/page.tsx": "",
        "app/api/generate/route.ts": ""
      },
      "image-generator": {
        "app/generator/page.tsx": "",
        "app/api/generate/route.ts": "",
        "lib/imageEngine.ts": ""
      },
      "saas-app": {
        "app/dashboard/page.tsx": "",
        "app/api/stripe/route.ts": "",
        "components/Sidebar.tsx": "",
        "components/Topbar.tsx": ""
      }
    };

    // Final structure
    const structure =
      typeMap[app_type] 
        ? { ...baseStructure, ...typeMap[app_type] }
        : baseStructure;

    return NextResponse.json({
      success: true,
      structure
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error during scaffold generation" },
      { status: 500 }
    );
  }
}
