import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { AccountsOverviewPage } from "../../pages/accountsoverview";
import userDataJson from "../../utils/userData.json"

test.describe("Parabank Savings Account Transactions Validation", () => {
    let loginPage: LoginPage;
    let accountsOverviewPage: AccountsOverviewPage;
    const savingsAccount = "14121";

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
    });

    test("Verify transactions in Savings Account", async () => {
        await accountsOverviewPage.navigateToAccountsOverview();
        await accountsOverviewPage.selectAccount(savingsAccount);

        await accountsOverviewPage.transactionCount();

        // Validate $10 transaction
        //await accountsOverviewPage.validateTransactionExists("10","Debit");

        // Validate $25 transaction
       // await accountsOverviewPage.validateTransactionExists("25","Debit");

         await accountsOverviewPage.validateBalanceAmount();
        await accountsOverviewPage.validateTransactionAmounts([{amount:'10.00'},{amount:'25.00'}]);
        await accountsOverviewPage.validateTransactionDetails("10","Debit");
        await accountsOverviewPage.validateTransactionDetails("25","Debit");
    });


 test.afterAll(async ({ page }) => {
        await page.close();
    });
});
