import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LanguageSwitch } from "./language-switch";
import { LogoMark, MenuIcon } from "./icons";

export const pageKeys = ["home", "services", "projects", "about", "contact"] as const;

export function pageHref(locale: string, key: (typeof pageKeys)[number]) {
  return key === "home" ? `/${locale}` : `/${locale}/${key}`;
}

export async function SiteHeader() {
  const locale = await getLocale();
  const t = await getDictionary();

  const links = pageKeys.map((key) => (
    <li key={key}>
      <Link
        href={pageHref(locale, key)}
        className="flex min-h-11 items-center px-3 font-medium text-white/85 hover:text-accent"
      >
        {t.nav[key]}
      </Link>
    </li>
  ));

  return (
    <header className="relative bg-dark text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-dark"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${locale}`} className="flex min-h-11 items-center gap-2 text-xl font-bold">
          <LogoMark className="h-8 w-8 text-white" />
          <span>{locale === "ar" ? "كيستريل" : "Kestrel"}</span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden md:block">
          <ul className="flex items-center gap-1">{links}</ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch current={locale} label={t.language.switchTo} title={t.language.switchLabel} />

          {/* Phone menu: <details> opens and closes without any JavaScript. */}
          <details className="group md:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/30 [&::-webkit-details-marker]:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">{t.nav.menu}</span>
            </summary>
            <nav aria-label={t.nav.main} className="absolute inset-x-0 top-[4.25rem] z-40 border-t border-white/10 bg-dark px-4 pb-4 shadow-lg">
              <ul className="flex flex-col">{links}</ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
