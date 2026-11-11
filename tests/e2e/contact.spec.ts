import { expect, test, type Page } from "@playwright/test";
import { TEST_ADMIN_PASSWORD } from "../../playwright.config";

// Next.js adds its own role="alert" (the route announcer), so pick only the page's alert.
const alertOf = (page: Page) => page.locator('[role="alert"]:not(#__next-route-announcer__)');

test("empty form shows an error on each required field (English)", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(alertOf(page)).toContainText("Please fix the fields");
  await expect(page.getByText("Enter your name")).toBeVisible();
  await expect(page.getByText("Enter a phone number")).toBeVisible();
  await expect(page.getByText("Choose a service.")).toBeVisible();
  await expect(page.getByText("Write at least 10 characters")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
});

test("bad email shows the email error in Arabic", async ({ page }) => {
  await page.goto("/ar/contact");
  await page.locator("#name").fill("اختبار");
  await page.locator("#phone").fill("0100 000 0000");
  await page.locator("#email").fill("not-an-email");
  await page.locator("#service").selectOption("cctv");
  await page.locator("#message").fill("رسالة تجريبية للاختبار فقط.");
  await page.getByRole("button", { name: "أرسل الطلب" }).click();
  await expect(page.getByText("اكتب بريدًا إلكترونيًا صحيحًا")).toBeVisible();
  await expect(page.locator("#email")).toBeFocused();
});

test("the server rejects bad data even without the browser checks", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x" } });
  expect(res.status()).toBe(400);
  const json = await res.json();
  expect(Object.keys(json.errors).sort()).toEqual(["message", "name", "phone", "service"]);
});

test("valid request shows thank-you and appears in /admin", async ({ page }) => {
  // Names allow letters only, so turn the time into letters (a-j).
  const name = `Tester ${[...String(Date.now())].map((d) => "abcdefghij"[+d]).join("")}`;
  await page.goto("/en/contact");
  await page.locator("#name").fill(name);
  await page.locator("#phone").fill("+20 100 000 0000");
  await page.locator("#service").selectOption("networking");
  await page.locator("#message").fill("Automated test request. Please ignore.");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();

  await page.goto("/admin");
  await page.getByLabel("Password").fill("wrong-password-000");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(alertOf(page)).toContainText("Wrong password");

  await page.getByLabel("Password").fill(TEST_ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByRole("heading", { name: "Contact requests" })).toBeVisible();
  await expect(page.getByText(name)).toBeVisible();
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", /noindex/);
});
