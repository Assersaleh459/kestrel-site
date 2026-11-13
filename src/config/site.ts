// Every fact a client may want to change lives here. Page text lives in src/messages/*.json.
// An empty value hides that item on the site (no invented numbers).

type SiteConfig = {
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: { en: string; ar: string };
  builtBy: { name: string; url: string };
};

export const site: SiteConfig = {
  // Full public address of the site, set as NEXT_PUBLIC_SITE_URL on Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Phone as people should dial it, e.g. "+20 100 000 0000". Empty = hidden.
  phone: "+20 100 000 0000", // fictional demo number
  // WhatsApp number: digits only with country code, no "+" or spaces, e.g. "201000000000". Empty = button hidden.
  whatsapp: "201000000000", // fictional demo number
  // .example is a reserved test domain, so this address can never reach a real person.
  email: "hello@kestrel.example",
  address: {
    en: "New Cairo, Cairo, Egypt (demo address)",
    ar: "القاهرة الجديدة، القاهرة، مصر (عنوان تجريبي)",
  },

  // Footer credit. Empty url = plain text.
  builtBy: { name: "Vyra Systems", url: "" },
};
