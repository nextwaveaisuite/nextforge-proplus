import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.files || typeof body.files !== "object") {
      return NextResponse.json(
        { success: false, error: "No files received" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Scaffold OK",
      files: body.files,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error", details: `${err}` },
      { status: 500 }
    );
  }
}
