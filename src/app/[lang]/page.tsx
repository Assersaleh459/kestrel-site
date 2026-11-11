import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon, CheckIcon, serviceIcons } from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "", t.meta.homeTitle, t.meta.homeDescription, t.meta.siteName, true);
}

const buttonPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-dark hover:bg-accent-hover";
const buttonGhost =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 font-semibold text-white hover:border-accent hover:text-accent";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getDictionary();
  const h = t.home;
  const services = t.services.items.slice(0, 3);
  const projects = t.projects.items.slice(0, 3);
  const serviceTitle = Object.fromEntries(t.services.items.map((s) => [s.id, s.title]));

  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-16">
          <div>
            <p className="font-semibold text-accent">{h.hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{h.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">{h.hero.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${locale}/contact`} className={buttonPrimary}>
                {h.hero.primary}
                <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
              </Link>
              <Link href={`/${locale}/services`} className={buttonGhost}>
                {h.hero.secondary}
              </Link>
            </div>
          </div>
          {/* Placeholder until real photos are added to public/images. */}
          <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-dark-soft md:block">
            <div className="absolute inset-0 grid grid-cols-2 gap-3 p-6">
              {Object.entries(serviceIcons).map(([id, Icon]) => (
                <div key={id} className="flex items-center justify-center rounded-2xl bg-white/5">
                  <Icon className="h-14 w-14 text-accent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <SectionHead title={h.services.title} intro={h.services.intro} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
            return (
              <li key={s.id} className="rounded-2xl border border-line bg-surface p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark text-accent">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.summary}</p>
              </li>
            );
          })}
        </ul>
        <MoreLink href={`/${locale}/services`} label={h.services.more} />
      </section>

      {/* Why us */}
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <SectionHead title={h.why.title} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {h.why.items.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-dark">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <SectionHead title={h.projects.title} intro={h.projects.intro} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => {
            const Icon = serviceIcons[p.service as keyof typeof serviceIcons];
            return (
              <li key={p.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div aria-hidden className="flex aspect-[16/10] items-center justify-center bg-dark-soft">
                  <Icon className="h-12 w-12 text-accent" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-muted">
                    {serviceTitle[p.service]} · {p.place}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <MoreLink href={`/${locale}/projects`} label={h.projects.more} />
      </section>

      {/* Call to action */}
      <section className="px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-dark px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">{h.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/80">{h.cta.text}</p>
          <Link href={`/${locale}/contact`} className={`${buttonPrimary} mt-8`}>
            {h.cta.button}
            <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}

function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-muted">
      {label}
      <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
    </Link>
  );
}
