"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function UpgradePage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Upgrade Required</h1>
      <p>Your current plan: <strong>{user?.plan}</strong></p>

      <div style={{ marginTop: "30px" }}>
        <a
          href="/pricing"
          style={{
            padding: "12px 20px",
            background: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          View Upgrade Options
        </a>
      </div>
    </div>
  );
}
