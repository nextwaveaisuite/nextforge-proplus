// src/app/api/auth/signup/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth-helpers";
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

    const hashed = await hashPassword(password);

    const { data, error } = await supabase
      .from("users")
      .insert({
        email,
        password: hashed,
        plan: "free",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Signup failed: " + error.message },
        { status: 500 }
      );
    }

    const session = await createLoginSession(data);

    return NextResponse.json({
      success: true,
      token: session.token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Signup failed" },
      { status: 500 }
    );
  }
}
