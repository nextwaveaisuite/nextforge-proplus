// src/app/api/auth/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth-helpers";
import { supabase } from "@/lib/supabaseClient";
import { createLoginSession } from "@/lib/client-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !userData) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, userData.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const session = await createLoginSession(userData);

    return NextResponse.json({
      success: true,
      token: session.token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Login failed" },
      { status: 500 }
    );
  }
}
