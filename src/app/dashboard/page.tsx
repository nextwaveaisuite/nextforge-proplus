"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      {/* PLAN BADGE */}
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "8px",
          background:
            user?.plan === "elite"
              ? "#c29fff"
              : user?.plan === "pro"
              ? "#7fc8ff"
              : "#ddd",
          color: user?.plan === "free" ? "#333" : "#000",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {user?.plan?.toUpperCase()}
      </div>

      {/* REST OF YOUR DASHBOARD HERE */}
      <h1>NextForge Pro+ Dashboard</h1>
      <p>Welcome, {user?.email}</p>

      {/* Add rest of dashboard content below */}
    </div>
  );
}
