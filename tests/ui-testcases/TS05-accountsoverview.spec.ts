import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { AccountsOverviewPage } from "../../pages/accountsoverview";
import userDataJson from "../../utils/userData.json"


test.describe("Parabank Account Validation", () => {
    let page: any;
    let loginPage: LoginPage;
    let accountsOverviewPage: AccountsOverviewPage;
    const accountNumber = "43980"; 

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
    });
    test.beforeEach(async () => {
        loginPage = new LoginPage(page);
        accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
    });

    test("Navigate to Accounts Overview and Validate Account", async () => {
        await accountsOverviewPage.navigateToAccountsOverview();
        await accountsOverviewPage.selectAccount(accountNumber);
        await accountsOverviewPage.validateAccountDetails(accountNumber);
    });

    test.afterEach(async () => {
        await page.close();
    });
});
