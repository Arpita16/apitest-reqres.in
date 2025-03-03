import { Page, expect } from "@playwright/test";
import checkingAccountJson from "..//utils//checkingAccount.json";
import savingsAccountJson from "../utils/savingsAccount.json";

export class TransferFundsPage {
  

    constructor(public page: Page){
        this.page = page;
        
    }

    async navigateToTransferFunds() {
        await this.page.getByRole('link',{name:'Transfer Funds'}).click();
    }

    async transferFunds(amount: string, fromAccount: string, toAccount: string) {
        await this.page.fill("#amount", amount);
        await this.page.selectOption("#fromAccountId", savingsAccountJson.accountNumber);
        await this.page.selectOption("#toAccountId", checkingAccountJson.accountNumber);
        await this.page.getByRole('button',{name:'Transfer'}).click();
    }

    async validateTransferSuccess() {
        await expect(this.page.locator('#showResult')).toContainText('Transfer Complete!');

    }
}
