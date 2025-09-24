import { Page, expect } from "@playwright/test";

export function watchConsole(page: Page) {
  // errors array creation
  const errors: string[] = [];

  // Listen for errors
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  // If error exist push to the array
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });

  // Expects errors array to equal to an empty array
  return function assertNoConsoleErrors() {
    expect(errors, "Console errors found").toEqual([]);
  };
}
