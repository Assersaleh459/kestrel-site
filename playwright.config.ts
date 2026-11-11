import { defineConfig, devices } from "@playwright/test";

// The contact API is rate-limited per client IP (5 requests / 10 min). Each run pretends to be
// a fresh private IP so reruns never throttle each other. Locally the app trusts
// x-forwarded-for; on Vercel the platform sets that header, so this only works locally.
const run = Date.now();
const testIp = `10.${(run >> 8) & 255}.${run & 255}.1`;

// Throwaway password for the local test server only. It is not the real admin password.
export const TEST_ADMIN_PASSWORD = "e2e-only-password-123";

// Run: npm run test:e2e   (builds the site, then starts it on port 3020)
// Browsers come from E:\ms-playwright (set PLAYWRIGHT_BROWSERS_PATH=E:\ms-playwright).
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // one server with an in-memory rate limit
  workers: 1,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [["line"]],
  use: {
    baseURL: "http://localhost:3020",
    trace: "retain-on-failure",
    extraHTTPHeaders: { "x-forwarded-for": testIp },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npx next start -p 3020",
    url: "http://localhost:3020/en",
    reuseExistingServer: true,
    timeout: 300_000, // slow disk: the build takes a minute or two
    // Tests never touch Neon: an empty DATABASE_URL makes leads go to data/leads.json.
    env: { ADMIN_PASSWORD: TEST_ADMIN_PASSWORD, DATABASE_URL: "" },
  },
});
