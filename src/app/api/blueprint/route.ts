import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || !data.app_type) {
      return NextResponse.json(
        { error: "Invalid classifier data" },
        { status: 400 }
      );
    }

    // --- BUILD BLUEPRINT FROM CLASSIFIER ---
    const { 
      app_type, 
      features, 
      ui_components, 
      routes, 
      backend, 
      description 
    } = data;

    // A universal blueprint generator (expandable in Step 5.3)
    const blueprint = {
      summary: `Blueprint for ${app_type}: ${description}`,

      frontend: {
        pages: routes.map((r) => ({
          path: r,
          file: `src/app${r === "/" ? "/page.tsx" : `${r}/page.tsx`}`,
        })),

        components: ui_components.map((c) => ({
          name: c,
          file: `src/components/${c}.tsx`,
        })),

        styles: ["globals.css", "tailwind.css"],
      },

      backend: {
        api_routes: [
          backend.requires_ai ? "/api/generate" : null,
          backend.requires_crud ? "/api/data" : null,
        ].filter(Boolean),

        auth: backend.requires_auth,
        stripe: backend.requires_stripe,
      },

      files_to_create: [
        ...routes.map((r) => `src/app${r === "/" ? "/page.tsx" : `${r}/page.tsx`}`),
        ...ui_components.map((c) => `src/components/${c}.tsx`),
        "src/app/api/generate/route.ts"
      ],

      notes: {
        requires_ai_key: backend.requires_ai,
        next_step: "Use this blueprint to generate scaffolding.",
      }
    };

    return NextResponse.json(blueprint);

  } catch (err) {
    console.error("BLUEPRINT ENGINE ERROR:", err);
    return NextResponse.json(
      { error: "Blueprint generation error" },
      { status: 500 }
    );
  }
}
