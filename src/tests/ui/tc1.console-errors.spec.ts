import { test, expect } from "@playwright/test";
import { watchConsole } from "@/utils/consoleWatcher";

test.describe("Console error checks", () => {
  test("@tc1 Home page has no console errors", async ({ page }) => {
    const assertNoConsoleErrors = watchConsole(page);

    await page.goto("");
    const homeSectionTitle = page.locator(".hero-content h1");
    await expect(homeSectionTitle).toHaveText("Welcome to FashionHub");

    await assertNoConsoleErrors();
  });

  test("@tc1 About page has no console errors", async ({ page }) => {
    const assertNoConsoleErrors = watchConsole(page);

    await page.goto("about.html");
    const aboutTitle = page.locator(".about-banner h1");
    await expect(aboutTitle).toHaveText("About FashionHub");

    await assertNoConsoleErrors();
  });
});
