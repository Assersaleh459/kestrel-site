# Kestrel Smart Home & Security: demo website

**This is a demo site for a fictional company.** Kestrel, its projects, numbers and address are made up. It shows a bilingual (English + Arabic) business website with a working contact form.

- 5 pages in English (`/en/...`) and Arabic (`/ar/...`, right to left): Home, Services, Projects, About, Contact
- Contact form with checks in both languages, spam protection (hidden field + rate limit), and a password-protected `/admin` page that lists the requests
- SEO basics: a title and description per page and language, canonical and language links, link-preview image, `sitemap.xml`, `robots.txt`
- Built with Next.js 16, React 19 and Tailwind CSS 4. No other UI libraries.

## Run it on your PC

Needs Node.js 20 or newer.

```
npm install
copy .env.local.example .env.local     (then fill in ADMIN_PASSWORD)
npm run dev
```

Open http://localhost:3000. It goes to `/en`.

Without `DATABASE_URL`, contact requests are saved to `data/leads.json` (your PC only).

## Change the text

All text is in two files:

- `src/messages/en.json`: English
- `src/messages/ar.json`: Arabic

Change the text between the quotes and keep the names before the colon. Both files must have the same names: if a name is missing in one file, `npm run build` stops and shows which one.

Services and projects are lists in the same files (`services.items`, `projects.items`).

## Change the phone, WhatsApp, email or address

Edit `src/config/site.ts`:

| Setting | Example | Note |
|---|---|---|
| `demo` | `true` | While `true`, the phone is plain text (no tap-to-call) and the WhatsApp button opens WhatsApp with no number. Set `false` for a real client |
| `phone` | `"+20 100 000 0000"` | Empty = hidden |
| `whatsapp` | `"201000000000"` | Digits only, with country code. Used only when `demo` is `false` |
| `email` | `"hello@yourcompany.com"` | |
| `address` | `en` and `ar` text | |

## Change the colours or font

- Colours: the block at the top of `src/app/globals.css` (`--dark`, `--accent`, `--page` and the others). Every colour on the site comes from there. The dark theme is the second block (it follows the visitor's device setting). Keep the contrast rule written there: blue text on the page uses `--accent-text`, never the raw blue.
- Font: `src/app/[lang]/layout.tsx` (one Google font for both languages, loaded with `next/font`).
- Photos: put WebP files (under 150 KB) in `public/images` and list them in `src/config/photos.ts`. Alt text is in the message files under `photoAlt`.
- Icon in the browser tab: `src/app/icon.svg`. Link-preview image: `public/og.png` (1200 × 630).

## How the languages work

Every page lives under `/en` or `/ar`. The page reads the language from the address, loads that language's text file, and sets `lang` and `dir="rtl"` for Arabic. The language button swaps `/en` and `/ar` and keeps you on the same page. An address without a language (e.g. `/services`) goes to the English version (`src/proxy.ts`).

## Settings (environment variables)

Names only. Never put the values in the code or in git.

| Name | Needed for |
|---|---|
| `ADMIN_PASSWORD` | `/admin` login. At least 12 characters, or login stays off |
| `DATABASE_URL` | Neon Postgres connection string. Required on Vercel. The table is created on first use |
| `NEXT_PUBLIC_SITE_URL` | The live address, e.g. `https://kestrel-site.vercel.app`. Used by the sitemap, canonical links and previews |

## Deploy to Vercel

1. Push the code to GitHub.
2. On vercel.com: Add New → Project → import the repo. Keep the default settings.
3. Under Settings → Environment Variables, add the three settings above.
4. Deploy. Then set `NEXT_PUBLIC_SITE_URL` to the live address and deploy again.
5. Send a test request from the Contact page and check `/admin`.

## Tests

```
npm test            unit tests for the contact form checks
npm run test:e2e    browser tests (builds the site and starts it on port 3020)
```

The browser tests use a throwaway admin password and save to `data/leads.json`, never to Neon. On this PC, set `PLAYWRIGHT_BROWSERS_PATH=E:\ms-playwright` first.

## Security notes

- Security headers and a Content Security Policy are set in `next.config.ts`.
- The rate limit is kept in server memory, so on Vercel it slows abuse but is not a hard limit. Use Upstash or Vercel Firewall before real traffic.
- `/admin` is hidden from search engines and protected by a password, a signed cookie (8 hours) and a lock after 5 wrong passwords.
