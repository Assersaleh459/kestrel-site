import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ArrowIcon, CheckIcon, serviceIcons } from "@/components/icons";
import { linkArrow } from "@/components/ui";

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
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-16">
        <div className="divide-y divide-line">
          {t.services.items.map((s) => {
            const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
            return (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="grid gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-14"
              >
                <div>
                  <Icon className="h-9 w-9 text-ink" />
                  <h2 id={`${s.id}-title`} className="mt-4 text-3xl font-bold">{s.title}</h2>
                  <p className="mt-3 text-lg text-muted">{s.summary}</p>
                  <Photo
                    slot={s.id}
                    alt={t.photoAlt[s.id as keyof typeof t.photoAlt]}
                    sizes="(min-width: 768px) 520px, 100vw"
                    className="mt-6 aspect-[16/10] rounded-2xl"
                  />
                  <Link href={`/${locale}/contact`} className={`${linkArrow} mt-6`}>
                    {p.cta}
                    <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
                  </Link>
                </div>
                <div>
                  <h3 className="font-semibold">{p.included}</h3>
                  <ul className="mt-3 divide-y divide-line border-y border-line">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 py-3 text-lg">
                        <CheckIcon className="mt-1.5 h-5 w-5 shrink-0 text-ink" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
