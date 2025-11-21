// src/app/api/auth/me/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { decodeJwt } from "jose";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    const token = auth.replace("Bearer ", "");
    const decoded: any = decodeJwt(token);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    return NextResponse.json({ user: data });
  } catch (err: any) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
