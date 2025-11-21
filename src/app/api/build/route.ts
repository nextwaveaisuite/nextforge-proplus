import { NextResponse } from "next/server";
import { generateAllFormats } from "@/src/lib/ai-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const description = body.description;
    const includeBackend = body.includeBackend ?? false;
    const includeFlutter = body.includeFlutter ?? false;

    const result = await generateAllFormats({
      description,
      includeBackend,
      includeFlutter,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Build failed" },
      { status: 500 }
    );
  }
}
