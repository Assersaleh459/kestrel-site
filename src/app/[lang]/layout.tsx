import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { site } from "@/config/site";
import { dirOf, getDictionary, getLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

// One font family for both languages: it has Arabic and Latin letters.
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: `%s | ${t.meta.siteName}` },
    description: t.meta.homeDescription,
  };
}

export const viewport: Viewport = { themeColor: "#1c1f24" };

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${plex.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-page font-sans text-ink">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
