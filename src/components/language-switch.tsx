"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { current: "en" | "ar"; label: string; title: string };

// Swaps /en/... <-> /ar/... so the visitor stays on the same page.
export function LanguageSwitch({ current, label, title }: Props) {
  const pathname = usePathname() || `/${current}`;
  const other = current === "en" ? "ar" : "en";
  const href = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      title={title}
      className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-sm font-semibold text-white hover:border-accent hover:text-accent"
    >
      {label}
    </Link>
  );
}
