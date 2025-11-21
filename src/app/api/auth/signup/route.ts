import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { hashPassword } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required." },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password_hash: hashed }])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, user: data[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal error." },
      { status: 500 }
    );
  }
}
