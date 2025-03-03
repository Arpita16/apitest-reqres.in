import { Locator, Page, expect } from "@playwright/test";
import { writeFileSync } from "fs";


export class AccountsOverviewPage {

    private table:Locator;
       
    constructor(public page: Page){
        this.page = page;
        this.table=page.locator('#transactionTable');
        }

    async navigateToAccountsOverview() {
        await this.page.getByRole('link',{name:'Accounts Overview'}).click();
    }
    async capturedSavingsAccount(){
        await this.page.waitForSelector('//*[@id="accountTable"]/tbody/tr[2]/td[1]/a');
        const accountNumber =await this.page.locator('//*[@id="accountTable"]/tbody/tr[2]/td[1]/a').textContent()
        console.log(accountNumber);
        const accountData = {
             accountNumber: accountNumber
        };
     
       writeFileSync('D:\\TecnicalTest-SOP\\utils\\savingsAccount.json', JSON.stringify( accountData));
       
     expect(accountNumber).toBeDefined();
     
 }
    

    async selectAccount(accountNumber: string) {
        await this.page.click(`text=${accountNumber}`);
    }

    async validateAccountDetails(accountNumber: string) {
             
        await expect(this.page.locator('#accountId')).toContainText(accountNumber);
        await expect(this.page.locator('#balance')).toContainText('$65.00');
        expect(this.page.locator("#accountType")).toContainText("SAVINGS"); 
    }

    
    async transactionCount(){
        const rowCount = await this.page.locator('//*[@id="transactionTable"]/tbody/tr').count();
    console.log(`Total transaction rows: ${rowCount}`);
        }
        
  
   async validateBalanceAmount(){
    const balanceAfterTransaction = await this.page.locator('td#balance').textContent();
    expect(balanceAfterTransaction).toMatch(/\$\d+\.\d{2}/); 

   }
   async validateTransactionDetails(amount:string){

    const rows =  this.table.locator("tbody tr") 
    const rowCount=await rows.count();

    for(let i=0;i<rowCount;i++){
        const rowText=await rows.nth(i).innerText();
        if(rowText.includes(amount)){
            console.log(`$${amount} transaction found`);
            return true;
        }
    }
    console.log('not found');
    return false;
}
}


