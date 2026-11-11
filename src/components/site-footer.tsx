import Link from "next/link";
import { site } from "@/config/site";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LogoMark } from "./icons";
import { pageHref, pageKeys } from "./site-header";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <footer className="bg-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white">
            <LogoMark className="h-7 w-7 text-white" />
            {t.meta.siteName}
          </p>
          <p className="mt-3">{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className="font-semibold text-white">{t.footer.pagesTitle}</h2>
          <ul className="mt-3 space-y-1">
            {pageKeys.map((key) => (
              <li key={key}>
                <Link href={pageHref(locale, key)} className="inline-flex min-h-11 items-center hover:text-accent">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-white">{t.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-2">
            {site.phone && (
              <li>
                {/* Phone numbers always read left to right, also inside Arabic text. */}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-accent">
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-accent">
                {site.email}
              </a>
            </li>
            <li>{site.address[locale]}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm sm:flex-row sm:justify-between sm:px-6">
          <p>{t.footer.demo}</p>
          <p>
            {t.footer.builtBy}{" "}
            {site.builtBy.url ? (
              <a href={site.builtBy.url} className="font-semibold text-accent hover:underline">
                {site.builtBy.name}
              </a>
            ) : (
              <span className="font-semibold text-accent">{site.builtBy.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
