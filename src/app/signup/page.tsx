"use client";

import { useState } from "react";
import { saveToken } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      saveToken(data.token || "");
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Account</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
