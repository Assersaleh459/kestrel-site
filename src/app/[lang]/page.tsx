import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/icons";
import { Photo } from "@/components/photo";
import { ServiceArea } from "@/components/service-area";
import { ServiceHub } from "@/components/service-hub";
import { buttonDark, buttonOnDark, buttonPrimary, chip, linkArrow } from "@/components/ui";
import { photos } from "@/config/photos";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "", t.meta.homeTitle, t.meta.homeDescription, t.meta.siteName, true);
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getDictionary();
  const h = t.home;
  const services = t.services.items;
  const [featured, ...others] = t.projects.items.slice(0, 3);
  const serviceTitle = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const arrow = <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />;

  return (
    <>
      {/* 1. Hero: one concrete line. The photo (slot "hero") goes behind a dark overlay; until it exists the band is plain charcoal. */}
      <section className="relative isolate overflow-hidden bg-dark text-white">
        {photos.hero && (
          <>
            <Photo slot="hero" alt={t.photoAlt.hero} sizes="100vw" priority className="absolute inset-0 -z-10" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-dark/75" />
          </>
        )}
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 md:pb-32 md:pt-24">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{h.hero.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">{h.hero.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${locale}/contact`} className={buttonPrimary}>
              {h.hero.primary}
              {arrow}
            </Link>
            <Link href={`/${locale}/services`} className={buttonOnDark}>
              {h.hero.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Services: the hub picture and four rows split by lines (no cards). */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 className="text-3xl font-bold sm:text-4xl">{h.services.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{h.services.intro}</p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <ServiceHub services={services.map(({ id, title }) => ({ id, title }))} />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <ul className="divide-y divide-line border-y border-line">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/${locale}/services#${s.id}`} className="group flex items-start justify-between gap-4 py-5">
                    <span>
                      <span className="block text-xl font-bold group-hover:text-accent-text">{s.title}</span>
                      <span className="mt-1 block text-muted">{s.summary}</span>
                    </span>
                    <span className="mt-1.5 shrink-0 text-ink">{arrow}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/services`} className={`${linkArrow} mt-6`}>
              {h.services.more}
              {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. How it works (this also answers "why us"). */}
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">{h.how.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{h.how.intro}</p>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {h.how.steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <p className="text-sm font-semibold text-muted">
                  <bdi>{i + 1}</bdi>
                </p>
                <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Sample projects: one featured, two text rows. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">{h.projects.title}</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{h.projects.intro}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:items-start lg:gap-12">
          <article className="overflow-hidden rounded-2xl border border-line bg-surface lg:col-span-3">
            {photos[featured.id] && (
              <Photo slot={featured.id} alt={t.photoAlt[featured.id as keyof typeof t.photoAlt]} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[16/10]" />
            )}
            <div className="p-6 sm:p-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-muted">
                <span className={chip}>{t.common.sample}</span>
                <span>
                  {serviceTitle[featured.service]} · {featured.place}
                </span>
              </p>
              <h3 className="mt-3 text-2xl font-bold">{featured.title}</h3>
              <p className="mt-2 text-lg text-muted">{featured.summary}</p>
            </div>
          </article>
          <ul className="divide-y divide-line border-y border-line lg:col-span-2 lg:self-start">
            {others.map((p) => (
              <li key={p.id} className="py-6 first:pt-5">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-muted">
                  <span className={chip}>{t.common.sample}</span>
                  <span>
                    {serviceTitle[p.service]} · {p.place}
                  </span>
                </p>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <p className="mt-1 text-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/${locale}/projects`} className={`${linkArrow} mt-8`}>
          {h.projects.more}
          {arrow}
        </Link>
      </section>

      {/* 5. Where we work and the reply time. */}
      <ServiceArea />

      {/* 6. Short FAQ. <details> works without JavaScript. */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">{h.faq.title}</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {h.faq.items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="shrink-0 text-2xl leading-none text-muted group-open:hidden">+</span>
                <span aria-hidden className="hidden shrink-0 text-2xl leading-none text-muted group-open:inline">−</span>
              </summary>
              <p className="pb-4 text-lg text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 7. Closing call to action: the one blue band on the page. */}
      <section className="bg-accent text-on-accent">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold">{h.cta.title}</h2>
            <p className="mt-2 text-lg">{h.cta.text}</p>
          </div>
          <Link href={`/${locale}/contact`} className={`${buttonDark} shrink-0`}>
            {h.cta.button}
            {arrow}
          </Link>
        </div>
      </section>
    </>
  );
}
