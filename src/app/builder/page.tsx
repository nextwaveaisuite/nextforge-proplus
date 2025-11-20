"use client";

import { useAuth } from "@/app/context/AuthContext";
import LockedFeature from "@/app/components/LockedFeature";

export default function BuilderPage() {
  const { user } = useAuth();

  // Lock out FREE users → need PRO
  if (user?.plan === "free") {
    return <LockedFeature required="pro" />;
  }

  // Lock out PRO users → need ELITE for ZIP export
  if (user?.plan === "pro") {
    return <LockedFeature required="elite" />;
  }

  // If ELITE → show full builder
  return (
    <div style={{ padding: "20px" }}>
      <h1>Builder Engine</h1>
      {/* your builder UI goes here */}
    </div>
  );
}
