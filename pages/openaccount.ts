import { Page,expect} from "@playwright/test";
import { writeFileSync } from "fs";



export class OpenAccountPage {

constructor(public page: Page){
        this.page = page;
        
    }
    async navigateToOpenAccount() {
        await this.page.getByRole('link',{name:'Open New Account'}).click();
    }

    async openSavingsAccount() {
        await this.page.selectOption("#type", "1"); // 1 = Savings
        await this.page.waitForSelector('select#fromAccountId.input')
        await this.page.getByRole('button',{name:'Open New Account'}).click(); 

           
       
    }   

    async validateAccountOpened() {
        await this.page.waitForLoadState();
        await this.page.bringToFront();    
        await expect(this.page.locator('#openAccountResult')).toContainText('Account Opened!');
        await expect(this.page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.');
        //await this.page.getByRole('link',{name:'Log Out'}).click();
    }
    async capturedSavingsAccount(){
        
        const msg=await this.page.locator('#openAccountResult > h1').textContent();
        console.log(msg)
        
        this.page.waitForLoadState();
        await this.page.waitForSelector(`//div[@id='openAccountResult']//p//a[@id='newAccountId']`);
        const accountNumber= await this.page.locator(`//div[@id='openAccountResult']//p//a[@id='newAccountId']`).textContent();
        console.log(accountNumber);

            const accountData = {
                 accountNumber: accountNumber
            };
         
           writeFileSync('D:\\TecnicalTest-SOP\\utils\\savingsAccount.json', JSON.stringify( accountData));
           
         expect(accountNumber).toBeDefined();
         
     }
    
}


