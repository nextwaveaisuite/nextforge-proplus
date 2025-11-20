"use client";

import { useEffect, useState } from "react";
import { tierLabels, isPro } from "@/lib/tiers";
import { getUser } from "@/lib/client-auth";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <p className="text-gray-500">{tierLabels[user.tier]}</p>

      {!isPro(user.tier) ? (
        <div className="p-6 bg-yellow-100 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Pro+ Feature Locked</h2>
          <p className="mb-4 text-gray-600">
            Upgrade to unlock the full App Generator Engine.
          </p>
          <a
            href="/upgrade"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Upgrade to Pro+
          </a>
        </div>
      ) : (
        <div>
          <a
            href="/generator"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Open App Generator
          </a>
        </div>
      )}
    </div>
  );
}
