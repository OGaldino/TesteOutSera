// src/steps/login.steps.ts
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productListPage: ProductListPage; // Adicionar para validação pós-login

Given('que estou na página de login do SauceDemo', async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  productListPage = new ProductListPage(page); // Instanciar ProductListPage
  await loginPage.gotoLoginPage();
});

When('eu faço login com usuário {string} e senha {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('eu devo ser redirecionado para a página de produtos', async function () {
  await productListPage.expectOnProductListPage();
  await browser.close(); // Fechar o navegador ao final do cenário
});