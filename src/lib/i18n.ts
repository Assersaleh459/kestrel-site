import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

// ar.json must have the same keys as en.json: TypeScript fails the build if a key is missing.
const dictionaries: Record<Locale, typeof en> = { en, ar };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

// The language of the current page, read from the /en or /ar part of the URL.
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  // lang() is undefined outside [lang] (the /admin root layout has no language).
  if (value === undefined || !isLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  return dictionaries[await getLocale()];
}

export function dictionaryFor(locale: Locale) {
  return dictionaries[locale];
}
