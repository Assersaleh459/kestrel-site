import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ServiceArea } from "@/components/service-area";
import { buttonDark } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "about", t.meta.aboutTitle, t.meta.aboutDescription, t.meta.siteName);
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getDictionary();
  const a = t.about;
  const h = t.home;

  return (
    <>
      <PageHero title={a.title} intro={a.intro} />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 className="text-3xl font-bold">{a.storyTitle}</h2>
          <div className="max-w-2xl space-y-4 text-lg text-muted">
            {a.story.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <ServiceArea />

      {/* How we work: a numbered list, not cards. */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <h2 className="text-3xl font-bold">{a.processTitle}</h2>
          <ol className="divide-y divide-line border-y border-line">
            {a.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 py-6">
                <span className="w-8 shrink-0 text-2xl font-bold text-muted">
                  <bdi>{i + 1}</bdi>
                </span>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-1 text-lg text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-accent text-on-accent">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold">{h.cta.title}</h2>
            <p className="mt-2 text-lg">{h.cta.text}</p>
          </div>
          <Link href={`/${locale}/contact`} className={`${buttonDark} shrink-0`}>
            {h.cta.button}
            <ArrowIcon className="h-5 w-5 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>
    </>
  );
}
