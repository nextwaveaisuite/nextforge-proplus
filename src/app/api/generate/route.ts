import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "generate route OK" });
}
