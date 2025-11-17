import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data || !data.blueprint) {
      return NextResponse.json(
        { error: "Missing blueprint" },
        { status: 400 }
      );
    }

    // Placeholder scaffold response until Step 5.4
    return NextResponse.json({
      status: "ok",
      message: "Scaffolding engine ready.",
      blueprint_received: true
    });

  } catch (err) {
    console.error("GENERATE ERROR:", err);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
