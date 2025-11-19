import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { blueprint } = await request.json();

    if (!blueprint || !blueprint.files) {
      return NextResponse.json(
        { error: "Blueprint missing or invalid." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "ok",
      files: blueprint.files,
    });
  } catch (err: any) {
    console.error("SCAFFOLD ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Scaffold failed" },
      { status: 500 }
    );
  }
}
