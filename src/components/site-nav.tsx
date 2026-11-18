"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MenuIcon } from "./icons";

export type NavLink = { key: string; href: string; label: string };

// A list of page links. The link for the current page gets aria-current="page".
export function NavItems({
  links,
  linkClass,
  listClass,
  onNavigate,
}: {
  links: NavLink[];
  linkClass: string;
  listClass: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "";
  return (
    <ul className={listClass}>
      {links.map((l) => {
        // Home is "/en" or "/ar": it must match exactly, the other pages also match their sub-paths.
        const isHome = /^\/(en|ar)$/.test(l.href);
        const current = isHome ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <li key={l.key}>
            <Link
              href={l.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={`${linkClass} aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// Phone menu. It is a <details> (works without JavaScript); this part closes it after a link is
// tapped, on Esc and when the visitor taps outside it.
export function MobileMenu({ links, label }: { links: NavLink[]; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const close = () => ref.current?.removeAttribute("open");
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (e.key === "Escape" && el?.open) {
        close();
        el.querySelector("summary")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <details ref={ref} className="md:hidden">
      <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/40 [&::-webkit-details-marker]:hidden">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </summary>
      <nav aria-label={label} className="absolute inset-x-0 top-full z-40 border-t border-white/10 bg-dark px-4 pb-4 shadow-lg">
        <NavItems
          links={links}
          listClass="flex flex-col"
          linkClass="flex min-h-12 items-center px-3 text-white/90 hover:text-accent"
          onNavigate={() => ref.current?.removeAttribute("open")}
        />
      </nav>
    </details>
  );
}
