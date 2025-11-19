"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>NextForge Pro+ Login</h2>

      <form onSubmit={handleLogin}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          style={{ width: "100%", padding: 12, marginTop: 25 }}
          type="submit"
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        No account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
}
