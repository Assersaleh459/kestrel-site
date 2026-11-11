import { expect, test } from "@playwright/test";

const slugs = ["", "/services", "/projects", "/about", "/contact"];

for (const lang of ["en", "ar"] as const) {
  for (const slug of slugs) {
    test(`/${lang}${slug} loads, right language, one h1, no sideways scroll on a phone`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      const res = await page.goto(`/${lang}${slug}`);
      expect(res?.status()).toBe(200);

      const html = page.locator("html");
      await expect(html).toHaveAttribute("lang", lang);
      await expect(html).toHaveAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      await expect(page.locator("h1")).toHaveCount(1);

      // SEO basics: description, canonical and both language links.
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/${lang}${slug}$`));
      await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);

      const { scrollW, clientW } = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      }));
      expect(scrollW).toBeLessThanOrEqual(clientW);
    });
  }
}

test("language switch keeps the page", async ({ page }) => {
  await page.goto("/en/services");
  await page.getByRole("link", { name: "العربية" }).click();
  await expect(page).toHaveURL(/\/ar\/services$/);
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/services$/);
});

test("addresses without a language go to English; unknown pages show the 404", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  const res = await page.goto("/ar/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "الصفحة غير موجودة" })).toBeVisible();
});

test("project filter shows only the chosen service", async ({ page }) => {
  await page.goto("/en/projects");
  await expect(page.locator("main li")).toHaveCount(6);
  await page.getByRole("button", { name: "Sound systems" }).click();
  await expect(page.locator("main li")).toHaveCount(1);
  await page.getByRole("button", { name: "All" }).click();
  await expect(page.locator("main li")).toHaveCount(6);
});

test("sitemap and robots", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/ar/contact");
  expect(sitemap).not.toContain("/admin");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /admin");
});
