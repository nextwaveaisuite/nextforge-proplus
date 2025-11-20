"use client";

import { getUser, clearToken } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    if (!u) router.push("/login");
    else setUser(u);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>NextForge Pro+ Dashboard</h1>
      <p>User: {user?.email}</p>

      <button
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
