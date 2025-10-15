import { Before, After, BeforeAll, AfterAll, World } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';


let browser: Browser; 

declare module '@cucumber/cucumber' {
  interface World {
    page: Page;
    browser: Browser; 
  }
}

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true, 
 });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: World) {
  this.page = await browser.newPage(); 
  this.browser = browser; 
});

After(async function (this: World) {
  if (this.page) {
    await this.page.close();
  }
});