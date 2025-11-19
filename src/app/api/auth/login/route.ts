import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const USERS_DB = path.join(process.cwd(), "users.json");
const SECRET = process.env.JWT_SECRET || "nextforge_secret_key";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Missing email or password." },
      { status: 400 }
    );
  }

  let users = [];

  if (fs.existsSync(USERS_DB)) {
    users = JSON.parse(fs.readFileSync(USERS_DB, "utf8"));
  }

  const hashed = crypto.createHash("sha256").update(password).digest("hex");

  const user = users.find(
    (u: any) => u.email === email && u.password === hashed
  );

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid login." },
      { status: 400 }
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      plan: user.plan,
      credits: user.credits,
    },
    SECRET,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({ success: true });

  response.cookies.set("session_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
