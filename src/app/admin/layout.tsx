import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";

// /admin has its own root layout (outside /en and /ar), in English only.
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leads | Kestrel admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} antialiased`}>
      <body className="min-h-dvh bg-page font-sans text-ink">{children}</body>
    </html>
  );
}
