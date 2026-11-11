import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ArrowIcon, CheckIcon, serviceIcons } from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "services", t.meta.servicesTitle, t.meta.servicesDescription, t.meta.siteName);
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getDictionary();
  const p = t.servicesPage;

  return (
    <>
      <PageHero title={p.title} intro={p.intro} />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        {t.services.items.map((s) => {
          const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-dark text-accent">
                <Icon className="h-8 w-8" />
              </span>
              <h2 id={`${s.id}-title`} className="mt-5 text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-lg text-muted">{s.summary}</p>
              <h3 className="mt-6 font-semibold">{p.included}</h3>
              <ul className="mt-3 space-y-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start font-semibold underline decoration-accent decoration-2 underline-offset-4 hover:text-muted"
              >
                {p.cta}
                <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
              </Link>
            </section>
          );
        })}
      </div>
    </>
  );
}
