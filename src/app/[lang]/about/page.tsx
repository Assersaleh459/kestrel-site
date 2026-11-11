import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "about", t.meta.aboutTitle, t.meta.aboutDescription, t.meta.siteName);
}

export default async function AboutPage() {
  const t = await getDictionary();
  const a = t.about;

  return (
    <>
      <PageHero title={a.title} intro={a.intro} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl font-bold">{a.storyTitle}</h2>
        {a.story.map((para) => (
          <p key={para} className="mt-4 text-lg text-muted">{para}</p>
        ))}
      </section>

      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-3xl font-bold">{a.numbersTitle}</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {a.numbers.map((n) => (
              <div key={n.label} className="flex flex-col rounded-2xl bg-dark p-6 text-white">
                <dt className="order-2 mt-1 text-white/80">{n.label}</dt>
                {/* <bdi> keeps "350+" or "+350" in its own direction inside Arabic text. */}
                <dd className="text-4xl font-bold text-accent">
                  <bdi>{n.value}</bdi>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted">{a.numbersNote}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-3xl font-bold">{a.processTitle}</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-dark">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
