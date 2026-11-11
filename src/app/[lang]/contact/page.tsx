import type { Metadata } from "next";
import { site } from "@/config/site";
import { getDictionary, getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return pageMetadata(await getLocale(), "contact", t.meta.contactTitle, t.meta.contactDescription, t.meta.siteName);
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = await getDictionary();
  const c = t.contact;
  const whatsappHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(c.whatsappText)}`
    : "";

  return (
    <>
      <PageHero title={c.title} intro={c.intro} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[3fr_2fr]">
        <div>
          <p role="note" className="mb-5 rounded-xl bg-soft px-4 py-3 font-semibold">
            {c.demoNote}
          </p>
          <ContactForm
            lang={locale}
            services={t.services.items.map(({ id, title }) => ({ id, title }))}
            t={{
              name: c.name, phone: c.phone, email: c.email, optional: c.optional, service: c.service,
              servicePlaceholder: c.servicePlaceholder, serviceOther: c.serviceOther, message: c.message,
              submit: c.submit, sending: c.sending, successTitle: c.successTitle, successText: c.successText,
              sendAnother: c.sendAnother, errors: c.errors,
            }}
          />
        </div>

        <aside className="space-y-6">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f7a4d] px-6 font-semibold text-white hover:bg-[#17603c]"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
              </svg>
              {c.whatsapp}
            </a>
          )}

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-xl font-bold">{c.detailsTitle}</h2>
            <ul className="mt-4 space-y-2">
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="underline underline-offset-4">
                    {site.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.email}`} dir="ltr" className="underline underline-offset-4">
                  {site.email}
                </a>
              </li>
              <li className="text-muted">{site.address[locale]}</li>
            </ul>
          </div>

          {/* Map placeholder: a drawing, not a live map (no third-party scripts, no tracking). */}
          <div role="img" aria-label={c.mapLabel} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-dark-soft">
            <svg viewBox="0 0 400 300" aria-hidden className="absolute inset-0 h-full w-full text-white/15">
              <path d="M0 80h400M0 190h400M90 0v300M260 0v300M0 260 400 20" stroke="currentColor" strokeWidth="10" fill="none" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-full text-accent">
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </svg>
          </div>
        </aside>
      </div>
    </>
  );
}
