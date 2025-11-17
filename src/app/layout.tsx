import type { ReactNode } from "react";

export const metadata = {
  title: "NextForge Pro+",
  description: "AI-powered app and website generator",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
