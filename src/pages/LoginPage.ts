import { Page, expect } from "@playwright/test";
import locators from "@/fixtures/locators.json";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("login.html");
  }

  username = () => this.page.locator(locators.login.username);
  password = () => this.page.locator(locators.login.password);
  submit = () => this.page.locator(locators.login.submit);

  async login(user: string, pass: string) {
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.submit().click();
  }
}
