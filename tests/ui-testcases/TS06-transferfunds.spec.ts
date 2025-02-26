import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginpage";
import { TransferFundsPage } from "../../pages/transferfunds";
import userDataJson from "../../utils/userData.json"

test.describe("Parabank Transfer Funds Tests", () => {
    
    let loginPage: LoginPage;
    let transferFundsPage: TransferFundsPage;
    const savingsAccount = "14121"; 
    const checkingAccount = "13788"; 
    let page: any;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(userDataJson);
        await loginPage.validateLoginSuccess();
       
    });

    test.beforeEach(async () => {
      transferFundsPage = new TransferFundsPage(page);

        
    });

    test("Transfer $10 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("10", savingsAccount, checkingAccount);
        await transferFundsPage.validateTransferSuccess();
    });

    test("Transfer $25 from Savings to Checking", async () => {
        await transferFundsPage.navigateToTransferFunds();
        await transferFundsPage.transferFunds("25", savingsAccount, checkingAccount);
        await transferFundsPage.validateTransferSuccess();
    });

    test.afterAll(async () => {
        await page.close();
    });
});
