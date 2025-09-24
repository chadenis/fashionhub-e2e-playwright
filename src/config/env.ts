// src/config/env.ts

export type Target = "LOCAL" | "STAGING" | "PROD";

const URLS: Record<Target, string> = {
  LOCAL: "http://localhost:4000/fashionhub/",
  STAGING: "https://staging-env/fashionhub/",
  PROD: "https://pocketaces2.github.io/fashionhub/",
};

export function resolveTarget(): Target {
  const fromCli = process.env.TARGET?.toUpperCase() as Target | undefined;
  const candidates: Target[] = ["LOCAL", "STAGING", "PROD"];

  if (fromCli && candidates.includes(fromCli)) return fromCli;

  const fromEnv = process.env.DEFAULT_TARGET?.toUpperCase() as
    | Target
    | undefined;
  if (fromEnv && candidates.includes(fromEnv)) return fromEnv;

  return "PROD";
}

export function resolveBaseURL(): string {
  return URLS[resolveTarget()];
}
