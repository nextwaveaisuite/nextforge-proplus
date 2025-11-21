// src/lib/client-auth.ts

import jwt from "jsonwebtoken";

export function createLoginSession(user: any) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return {
    token,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
}
