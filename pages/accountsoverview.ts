import { Page, expect } from "@playwright/test";


export class AccountsOverviewPage {
    
 

    constructor(public page: Page){
        this.page = page;
        
    }

    async navigateToAccountsOverview() {
        await this.page.getByRole('link',{name:'Accounts Overview'}).click();
    }
    

    

    async selectAccount(accountNumber: string) {
        await this.page.click(`text=${accountNumber}`);
    }

    async validateAccountDetails(accountNumber: string) {
        await expect(this.page.locator('#accountDetails')).toContainText('Account Details');
        
        await expect(this.page.locator('#accountId')).toContainText(accountNumber);

        await expect(this.page.locator('#balance')).toContainText('$100.00');

      
        expect(this.page.locator("#accountType")).toContainText("SAVINGS"); 
    }
    async transactionCount(){
        const rowCount = await this.page.locator("//table[@id='transactionTable']//tbody/tr").count();
    console.log(`Total transaction rows: ${rowCount}`);
        }
        
  
   async validateBalanceAmount(){
    const balanceAfterTransaction = await this.page.locator('#balance').textContent();
    expect(balanceAfterTransaction).toMatch(/\d+\.\d{2}/); 

   }
   async validateTransactionDetails(amount:string,transactiontype:string){
    const transactions = await this.page.$$('tr[ng-repeat="transaction in transactions"]');
    for (const transaction of transactions) {
        const transactionText = await transaction.textContent();
        if (transactionText?.match(amount)) {
          console.log(`${amount} transfer found in Savings account transactions.`);
        }
   }

    }  
  
    async validateTransactionAmounts(transactions:{amount:string}[]) {

        for(const transaction of transactions){
            await expect(this.page.locator(`xpath=-//td[contains(text(),'${transaction.amount}')]`)).toBeVisible();
        }
    }
}


