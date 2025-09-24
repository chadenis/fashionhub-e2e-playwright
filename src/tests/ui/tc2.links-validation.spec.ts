// src/tests/api/tc2.links-codes.spec.ts
import { test } from "@playwright/test";
import {
  getAllHrefs,
  normalizeUrls,
  assertLinkOk,
  navigateLinkOk,
} from "@/utils/links";

test("@tc2 Home links return 200/30x and no 40x", async ({
  page,
  request,
  baseURL,
}) => {
  // 1) Go to home
  await page.goto(""); // baseURL already has /fashionhub/

  // 2) Collect hrefs from the DOM
  const hrefs = await getAllHrefs(page);

  // 3) Normalize into full URLs (resolve relatives, filter junk, dedupe)
  const urls = normalizeUrls(hrefs, baseURL!);

  // 4) Validate each link’s status via GET
  for (const url of urls) {
    await assertLinkOk(request, url);
  }

  // 5) Navigate to url
  for (const url of urls) {
    await navigateLinkOk(page, url);
  }
});
