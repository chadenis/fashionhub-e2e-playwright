import { defineConfig, devices } from "@playwright/test";
import { resolveBaseURL } from "./src/config/env";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: resolveBaseURL() || "https://pocketaces2.github.io/fashionhub/",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
