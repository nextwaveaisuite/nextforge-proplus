import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();
    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }
    return NextResponse.json({
      app_type: "text-generator",
      features: ["text generation", "UI form", "output panel"],
      ui_components: ["InputBox","GenerateButton","OutputCard"],
      requires_auth: false,
      requires_stripe: false,
      requires_crud: false,
      description: "A simple text generator."
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}