"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>Create Your Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          required
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          style={{ width: "100%", padding: 12, marginTop: 25 }}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
