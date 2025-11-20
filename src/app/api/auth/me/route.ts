import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-helpers";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, user: null });
    }

    const user = await verifyToken(token);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ success: false, user: null });
  }
}
