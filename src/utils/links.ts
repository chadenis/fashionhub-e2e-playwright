import { Page, expect, APIRequestContext } from "@playwright/test";

export async function getAllHrefs(page: Page): Promise<string[]> {
  const hrefs = await page.$$eval("a[href]", (as) =>
    as.map((a) => (a as HTMLAnchorElement).getAttribute("href")).filter(Boolean)
  );
  return hrefs as string[];
}

export function normalizeUrls(hrefs: string[], baseURL: string): string[] {
  const urls = new Set<string>();
  for (const href of hrefs) {
    if (!href) continue;
    const lower = href.toLowerCase();
    if (
      lower.startsWith("#") ||
      lower.startsWith("javascript:") ||
      lower.startsWith("mailto:") ||
      lower.startsWith("tel:")
    ) {
      continue;
    }
    try {
      const url = new URL(href, baseURL).toString();
      urls.add(url);
    } catch {
      // skip invalid URL
    }
  }
  return Array.from(urls);
}

export async function assertLinkOk(request: APIRequestContext, url: string) {
  const res = await request.get(url, { maxRedirects: 5 });
  const status = res.status();
  expect(
    status < 400,
    `Broken link detected: ${url} returned status ${status}`
  ).toBeTruthy();
}

export async function navigateLinkOk(page: Page, url: string) {
  const browser = page.context().browser();
  if (!browser) {
    // Fallback: if browser is unavailable, keep current behavior with a fresh tab
    const fresh = await page.context().newPage();
    try {
      console.log("[navigateLinkOk - GOTO]", url);
      const response = await fresh.goto(url, { waitUntil: "domcontentloaded" });
      console.log("[navigateLinkOk - FINAL URL]", fresh.url());

      if (response) {
        const status = response.status();
        expect(
          status < 400,
          `Navigation to ${url} returned HTTP ${status}`
        ).toBeTruthy();
      } else {
        await expect(fresh.locator("body")).toBeVisible();
      }
    } finally {
      await fresh.close();
    }
    return;
  }

  // New window per URL (isolated browser context)
  const ctx = await browser.newContext();
  const win = await ctx.newPage();

  const response = await win.goto(url, { waitUntil: "domcontentloaded" });

  if (response) {
    const status = response.status();
    expect(
      status < 400,
      `Navigation to ${url} returned HTTP ${status}`
    ).toBeTruthy();
  } else {
    await expect(win.locator("body")).toBeVisible();
  }
  await ctx.close(); // closes the whole window
}
