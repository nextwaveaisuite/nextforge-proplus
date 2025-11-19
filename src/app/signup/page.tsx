"use client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    if (res.ok) window.location.href = "/dashboard";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Account</h1>
      <input placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Sign Up</button>
    </div>
  );
}
