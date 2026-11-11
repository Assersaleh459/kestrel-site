import type { Metadata } from "next";
import type { Locale } from "./i18n";

// Page slugs after /en or /ar ("" = home). The sitemap uses the same list.
export const PAGES = ["", "services", "projects", "about", "contact"] as const;
export type PageSlug = (typeof PAGES)[number];

const href = (locale: Locale, slug: PageSlug) => (slug ? `/${locale}/${slug}` : `/${locale}`);

// Title, description, canonical URL, language links and link-preview tags for one page.
// `absoluteTitle` skips the "| Kestrel..." suffix (used on the home page).
export function pageMetadata(
  locale: Locale,
  slug: PageSlug,
  title: string,
  description: string,
  siteName: string,
  absoluteTitle = false,
): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: href(locale, slug),
      languages: { en: href("en", slug), ar: href("ar", slug), "x-default": href("en", slug) },
    },
    openGraph: {
      type: "website",
      url: href(locale, slug),
      siteName,
      title: absoluteTitle ? title : `${title} | ${siteName}`,
      description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
    },
  };
}
