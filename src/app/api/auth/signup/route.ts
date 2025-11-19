import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/hash";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashed }])
      .select()
      .single();

    if (error) throw error;

    const token = signToken(data.id);

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}
