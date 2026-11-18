// Every fact a client may want to change lives here. Page text lives in src/messages/*.json.
// An empty value hides that item on the site (no invented numbers).

type SiteConfig = {
  url: string;
  demo: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  address: { en: string; ar: string };
};

export const site: SiteConfig = {
  // Full public address of the site, set as NEXT_PUBLIC_SITE_URL on Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Demo switch. While true, the phone is shown as plain text (no tap-to-call link) and the
  // WhatsApp button opens WhatsApp WITHOUT a number, so the made-up number below can never be dialled.
  // For a real client: put their real numbers below and set this to false.
  demo: true,

  // Phone as people should dial it, e.g. "+20 100 000 0000". Empty = hidden.
  phone: "+20 100 000 0000", // fictional demo number
  // WhatsApp number: digits only with country code, no "+" or spaces, e.g. "201000000000". Used only when demo is false.
  whatsapp: "201000000000", // fictional demo number
  // .example is a reserved test domain, so this address can never reach a real person.
  email: "hello@kestrel.example",
  address: {
    en: "New Cairo, Cairo, Egypt (demo address)",
    ar: "القاهرة الجديدة، القاهرة، مصر (عنوان تجريبي)",
  },
};

// Link for the phone number, or "" when it must not be dialable.
export function phoneUrl(): string {
  return site.demo || !site.phone ? "" : `tel:${site.phone.replace(/\s/g, "")}`;
}

// WhatsApp link with a ready-made first message. In demo mode there is no number in the link.
export function whatsappUrl(text: string): string {
  const number = site.demo ? "" : site.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
