import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LanguageSwitch } from "./language-switch";
import { LogoMark } from "./icons";
import { MobileMenu, NavItems, type NavLink } from "./site-nav";

export const pageKeys = ["home", "services", "projects", "about", "contact"] as const;

export function pageHref(locale: string, key: (typeof pageKeys)[number]) {
  return key === "home" ? `/${locale}` : `/${locale}/${key}`;
}

export async function navLinks(): Promise<NavLink[]> {
  const locale = await getLocale();
  const t = await getDictionary();
  return pageKeys.map((key) => ({ key, href: pageHref(locale, key), label: t.nav[key] }));
}

export async function SiteHeader() {
  const locale = await getLocale();
  const t = await getDictionary();
  const links = await navLinks();

  return (
    <header className="relative bg-dark text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${locale}`} className="flex min-h-11 items-center gap-2 text-xl font-bold">
          <LogoMark className="h-8 w-8 text-white" />
          <span>{locale === "ar" ? "كيستريل" : "Kestrel"}</span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden md:block">
          <NavItems
            links={links}
            listClass="flex items-center gap-1"
            linkClass="flex min-h-11 items-center px-3 text-white/90 hover:text-accent"
          />
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch current={locale} label={t.language.switchTo} title={t.language.switchLabel} />
          <MobileMenu links={links} label={t.nav.menu} />
        </div>
      </div>
    </header>
  );
}
