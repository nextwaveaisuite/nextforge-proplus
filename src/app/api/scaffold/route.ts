import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { app_type } = await req.json();

    if (!app_type) {
      return NextResponse.json(
        { error: "Missing app_type" },
        { status: 400 }
      );
    }

    const baseStructure = {
      "app/page.tsx": "",
      "app/api/generate/route.ts": "",
      "components/Header.tsx": "",
      "components/Footer.tsx": "",
      "styles/app.css": ""
    };

    const typeMap = {
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

    const structure =
      typeMap[app_type] 
        ? { ...baseStructure, ...typeMap[app_type] }
        : baseStructure;

    return NextResponse.json({
      success: true,
      structure
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Server error during scaffold generation" },
      { status: 500 }
    );
  }
}