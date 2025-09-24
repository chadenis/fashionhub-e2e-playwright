// src/utils/github.ts
import { APIRequestContext } from "@playwright/test";

export interface PullRequest {
  title: string;
  created_at: string;
  user?: { login?: string };
}

/**
 * Fetch open PRs from GitHub with simple pagination.
 * @param request Playwright APIRequestContext
 * @param owner repo owner (e.g., "appwrite")
 * @param repo repo name (e.g., "appwrite")
 * @param perPage items per page (max 100)
 * @param maxPages safety cap to avoid hitting rate limits
 */
export async function fetchOpenPRs(
  request: APIRequestContext,
  owner: string,
  repo: string,
  perPage = 50,
  maxPages = 10
): Promise<PullRequest[]> {
  const all: PullRequest[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=${perPage}&page=${page}`;
    const res = await request.get(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok()) break;
    const data = (await res.json()) as PullRequest[];
    all.push(...data);
    if (data.length < perPage) break;
  }
  return all;
}

export function transformPrsForCsv(prs: PullRequest[]) {
  return prs.map((pr) => ({
    name: pr.title,
    created_at: pr.created_at,
    author: pr.user?.login ?? "",
  }));
}
