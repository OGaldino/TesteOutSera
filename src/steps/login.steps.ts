import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';

let page: Page;
let loginPage: LoginPage;
let productListPage: ProductListPage;

Given('que estou na página de login do SauceDemo', async function () {
  loginPage = new LoginPage(this.page);
  productListPage = new ProductListPage(this.page); 
  await loginPage.gotoLoginPage();
});

When('eu faço login com usuário {string} e senha {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('eu devo ser redirecionado para a página de produtos', async function () {
  await productListPage.expectOnProductListPage();
});