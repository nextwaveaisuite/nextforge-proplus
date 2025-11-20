"use client";

import { useEffect, useState } from "react";
import { getToken, clearToken } from "@/src/lib/client-auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!data.loggedIn) {
        clearToken();
        router.push("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading dashboard...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", fontFamily: "Arial" }}>
      <h1>Welcome, {user.email}</h1>

      <p>Your dashboard is ready. Phase 2 awaits.</p>

      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: 0,
          cursor: "pointer"
        }}
        onClick={() => {
          clearToken();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
