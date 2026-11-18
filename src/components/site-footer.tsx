import { phoneUrl, site } from "@/config/site";
import { getDictionary, getLocale } from "@/lib/i18n";
import { LogoMark } from "./icons";
import { navLinks } from "./site-header";
import { NavItems } from "./site-nav";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getDictionary();
  const links = await navLinks();

  return (
    <footer className="bg-dark text-white/85">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white">
            <LogoMark className="h-7 w-7 text-white" />
            {t.meta.siteName}
          </p>
          <p className="mt-3">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.pagesTitle}>
          <h2 className="font-semibold text-white">{t.footer.pagesTitle}</h2>
          <NavItems
            links={links}
            listClass="mt-2 flex flex-wrap gap-x-4 md:flex-col md:gap-x-0"
            linkClass="inline-flex min-h-11 min-w-11 items-center hover:text-accent"
          />
        </nav>

        <div>
          <h2 className="font-semibold text-white">{t.footer.contactTitle}</h2>
          <ul className="mt-2">
            {site.phone && (
              <li className="flex min-h-11 items-center">
                {/* Plain text in demo mode (no tap-to-call). Phone numbers always read left to right. */}
                <PhoneText />
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} dir="ltr" className="inline-flex min-h-11 items-center hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="py-2">{site.address[locale]}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm sm:px-6">
          <p>{t.footer.demo}</p>
        </div>
      </div>
    </footer>
  );
}

function PhoneText() {
  const href = phoneUrl();
  return href ? (
    <a href={href} dir="ltr" className="inline-flex min-h-11 items-center hover:text-accent">
      {site.phone}
    </a>
  ) : (
    <span dir="ltr">{site.phone}</span>
  );
}
