import {test,expect,chromium} from '@playwright/test';


test('launch page', async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,

    
    });
    const page = await context.newPage();


  await page.goto('https://demoqa.com/text-box');

const title = await page.title();
console.log(title);
  
    
   
});