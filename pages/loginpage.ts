import { Page ,expect} from '@playwright/test';
const fs = require('fs');


export class LoginPage {

  private usernameInput = `input[name='username']`;
  private passwordInput = `input[name='password']`;

    constructor(public page: Page){
        this.page = page;
        
    }
    async navigateToLoginPage(){
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC')
    }

    async login(userData:any) {
        await this.page.fill(this.usernameInput,userData.Username);
        await this.page.fill(this.passwordInput,userData.Password);

        await this.page.getByRole('button',{name:"Log In"}).click();  
     
    }
    async validateLoginSuccess(){
              
             const successMessage= await this.page.locator('#showOverview');

              await expect(successMessage).toContainText('Accounts Overview');
      

    }
    async capturedAccount(){
    
        const checkingAccountID=await this.page.locator('td#accountId');
        fs.writeFileSync('checking_accounts.json', JSON.stringify(checkingAccountID));
        
    }
}