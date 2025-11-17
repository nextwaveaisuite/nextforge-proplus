import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "export route OK" });
}
