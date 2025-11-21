export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { verifyPassword } from "@/lib/auth-helpers";
import { createLoginSession } from "@/lib/client-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: "Invalid login credentials." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid login credentials." },
        { status: 401 }
      );
    }

    const session = createLoginSession(user);

    return NextResponse.json({ success: true, user, session });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
