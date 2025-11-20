import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/hash";
import { createClient } from "@/lib/supabase";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const supabase = createClient();

    // Find user
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error || !users || users.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 400 }
      );
    }

    const user = users[0];

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 400 }
      );
    }

    const token = signToken({ id: user.id, email: user.email });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
