import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json(
        { error: "No idea provided" },
        { status: 400 }
      );
    }

    // --- CLASSIFICATION PROMPT ---
    const prompt = `
You are the Classification Engine for NextForge Pro+.
Your job: analyze the user's app idea and return a clean JSON structure.

Respond ONLY with JSON, using this schema:

{
  "app_type": "",
  "complexity": "",
  "features": [],
  "ui_components": [],
  "routes": [],
  "backend": {
    "requires_auth": false,
    "requires_crud": false,
    "requires_ai": false,
    "requires_stripe": false
  },
  "description": ""
}

Classify this idea:
"${idea}"
`;

    // --- TEMPORARY FAKE AI RESPONSE (until we hook OpenAI in Step 5.3) ---
    const fakeResponse = {
      app_type: "ai-text-generator",
      complexity: "simple",
      features: ["input box", "AI generation", "output panel"],
      ui_components: ["Input", "Button", "Card"],
      routes: ["/", "/dashboard"],
      backend: {
        requires_auth: false,
        requires_crud: false,
        requires_ai: true,
        requires_stripe: false,
      },
      description: "A simple AI text generator app."
    };

    return NextResponse.json(fakeResponse);

  } catch (err) {
    console.error("CLASSIFIER ERROR:", err);
    return NextResponse.json(
      { error: "Server error during classification" },
      { status: 500 }
    );
  }
}
