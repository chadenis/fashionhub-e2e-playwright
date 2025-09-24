import { test } from "@playwright/test";
import { LoginPage } from "@/pages/LoginPage";
import { AccountPage } from "@/pages/AccountPage";
import testData from "@/fixtures/testData.json";

test.describe("Login feature", () => {
  test("@tc3 User login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );

    const accountPage = new AccountPage(page);
    await accountPage.validateAccountPage();
  });
});
