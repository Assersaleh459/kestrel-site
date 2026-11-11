import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/lib/i18n";
import { PAGES } from "@/lib/seo";

// Every page in both languages, each pointing to its other-language version. /admin and /api are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string, slug: string) => `${site.url}/${locale}${slug ? `/${slug}` : ""}`;
  return PAGES.flatMap((slug) =>
    locales.map((locale) => ({
      url: url(locale, slug),
      changeFrequency: "monthly" as const,
      priority: slug === "" ? 1 : 0.7,
      alternates: { languages: { en: url("en", slug), ar: url("ar", slug) } },
    })),
  );
}
