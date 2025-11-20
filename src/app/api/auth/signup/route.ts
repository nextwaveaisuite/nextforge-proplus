import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash";
import { createClient } from "@/lib/supabase";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const supabase = createClient();

    const password_hash = await hashPassword(password);

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password_hash }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: "User already exists or DB error." },
        { status: 400 }
      );
    }

    const token = signToken({ id: data.id, email: data.email });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Signup failed" },
      { status: 500 }
    );
  }
}
