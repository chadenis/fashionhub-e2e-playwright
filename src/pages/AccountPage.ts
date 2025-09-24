import { Page, expect } from "@playwright/test";
import locators from "@/fixtures/locators.json";

export class AccountPage {
  constructor(private page: Page) {}

  welcomeMessage = () => this.page.locator(locators.account.welcome);
  logoutButton = () => this.page.locator(locators.account.logoutButton);

  async validateAccountPage() {
    await expect(this.welcomeMessage()).toHaveText(/^Welcome,/);
    await expect(this.logoutButton()).toBeVisible();
  }
}
