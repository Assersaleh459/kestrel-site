import Link from "next/link";
import { buttonPrimary } from "@/components/ui";
import { getDictionary, getLocale } from "@/lib/i18n";

// Shown for unknown pages under /en/... and /ar/..., in that language.
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getDictionary();

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-bold text-muted">404</p>
      <h1 className="mt-4 text-3xl font-bold">{t.notFound.title}</h1>
      <p className="mt-3 text-lg text-muted">{t.notFound.text}</p>
      <Link
        href={`/${locale}`}
        className={`${buttonPrimary} mt-8`}
      >
        {t.notFound.button}
      </Link>
    </section>
  );
}
