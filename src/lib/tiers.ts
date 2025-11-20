// src/lib/tiers.ts
export type UserTier = "free" | "pro" | "elite";

export function isPro(tier: UserTier) {
  return tier === "pro" || tier === "elite";
}

export function isElite(tier: UserTier) {
  return tier === "elite";
}

export const tierLabels: Record<UserTier, string> = {
  free: "Free User",
  pro: "Pro User",
  elite: "Elite User",
};

export const tierFeatures = {
  free: {
    builder: false,
    export: false,
    aiLimit: "Basic AI",
  },
  pro: {
    builder: true,
    export: true,
    aiLimit: "Full AI",
  },
  elite: {
    builder: true,
    export: true,
    aiLimit: "Full AI + Elite Templates",
  },
};
