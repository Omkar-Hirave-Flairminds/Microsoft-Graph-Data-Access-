const puppeteer = require('puppeteer');
const {email , password} = require('./config/index.js');

async function automateVerification(info) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    try {
      await page.goto(info.verificationUri);
  
      await page.type('input#otc', info.userCode);
      await page.waitForTimeout(5000);
      // Click the "Next" button
      await page.click('input#idSIButton9');
      await page.waitForTimeout(5000);
      // Enter the email
      // await page.type('input#i0116', 'omkar.hirave@flairminds.com');
      await page.type('input#i0116', email);
      await page.click('input#idSIButton9');
      await page.waitForTimeout(5000);
      await page.click('div#aadTile.table');
      await page.waitForTimeout(5000);
      await page.type('input#i0118', password);
      await page.waitForTimeout(5000);
      await page.click('input#idSIButton9');
      await page.waitForTimeout(5000);
      await page.click('input#idSIButton9');
      
      await browser.close();
    } catch (error) {
      console.error(`Error automating verification: ${error}`);
      await browser.close();
    }
  }
// async function automateVerification(info) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//       await page.goto(info.verificationUri);

//       await page.type('input#otc', info.userCode);
//       await page.click('input#idSIButton9');
      
//       // Wait for email input field to appear
//       await page.waitForSelector('input#i0116');
//       await page.type('input#i0116', email);
//       await page.click('input#idSIButton9');

//       // Wait for the Azure AD tile to appear
//       await page.waitForSelector('div#aadTile.table');
//       await page.click('div#aadTile.table');

//       // Wait for the password input field to appear
//       await page.waitForSelector('input#i0118');
//       await page.type('input#i0118', password);

//       await page.click('input#idSIButton9');
//       await page.click('input#idSIButton9');
    
//       await browser.close();
//   } catch (error) {
//       console.error(`Error automating verification: ${error}`);
//       await browser.close();
//   }
// }


module.exports = {automateVerification }
  