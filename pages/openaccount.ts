import { Page,expect} from "@playwright/test";
const fs = require('fs');


export class OpenAccountPage {


    constructor(public page: Page){
        this.page = page;
        
    }
    async navigateToOpenAccount() {
        await this.page.getByRole('link',{name:'Open New Account'}).click();
    }

    async openSavingsAccount() {
        await this.page.selectOption("#type", "1"); // 1 = Savings
        await this.page.getByRole('button',{name:'Open New Account'}).click();
    }

    async validateAccountOpened() {
        await expect(this.page.locator('#openAccountResult')).toContainText('Account Opened!');
        await expect(this.page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.');
    }
    async capturedAccount(){
    
        const savingsAccountID=await this.page.locator('td#accountId');
        fs.writeFileSync('savingsaccounts.json', JSON.stringify(savingsAccountID));
        
    }

}
