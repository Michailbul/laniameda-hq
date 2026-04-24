import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ai-creatorship-os",
  description: "Filesystem-first prompt memory surface for AI creatorship projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
