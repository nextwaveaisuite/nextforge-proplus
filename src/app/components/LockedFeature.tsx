"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function LockedFeature({ required }: { required: string }) {
  const { user } = useAuth();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px dashed #aaa",
        borderRadius: "8px",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h3>Feature Locked</h3>
      <p>
        This feature requires:{" "}
        <strong>{required.toUpperCase()}</strong>.
      </p>

      <a
        href="/pricing"
        style={{
          marginTop: "10px",
          display: "inline-block",
          padding: "10px 16px",
          background: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Upgrade Plan
      </a>
    </div>
  );
}
