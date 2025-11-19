import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const USERS_DB = path.join(process.cwd(), "users.json");

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Email & password required." },
      { status: 400 }
    );
  }

  let users = [];

  if (fs.existsSync(USERS_DB)) {
    users = JSON.parse(fs.readFileSync(USERS_DB, "utf8"));
  }

  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json(
      { success: false, error: "Email already exists." },
      { status: 400 }
    );
  }

  const hashed = crypto.createHash("sha256").update(password).digest("hex");

  users.push({
    id: crypto.randomUUID(),
    email,
    password: hashed,
    createdAt: new Date().toISOString(),
    plan: "free",
    credits: 50,
  });

  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true });
}
