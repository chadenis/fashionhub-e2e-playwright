// src/tests/api/tc4.github-prs.spec.ts
import { test, expect } from "@playwright/test";
import { fetchOpenPRs, transformPrsForCsv } from "@/utils/github";
import { saveCsv } from "@/utils/csv";

test.describe("GitHub PR export", () => {
  test("@tc4 Export open PRs (name, created_at, author) to CSV", async ({
    request,
  }) => {
    const prs = await fetchOpenPRs(request, "appwrite", "appwrite", 50, 10);

    expect(prs.length, "No open PRs fetched from GitHub").toBeGreaterThan(0);

    const rows = transformPrsForCsv(prs);
    saveCsv(rows, "./src/fixtures/openPrs/pr-list.csv");
  });
});
