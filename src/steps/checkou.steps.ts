// src/steps/checkout.steps.ts
import { Given, When, Then, DataTable, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';

import { LoginPage } from '../pages/LoginPage'; // Necessário para o step 'Dado que estou logado'
import { ProductListPage } from '../pages/ProductListPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productListPage: ProductListPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let orderConfirmationPage: OrderConfirmationPage;

// --- GIVEN ---
Given('que estou logado no SauceDemo', async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  productListPage = new ProductListPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
  orderConfirmationPage = new OrderConfirmationPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.login('standard_user', 'secret_sauce');
  await productListPage.expectOnProductListPage(); // Validar que está na página de produtos
});

// --- WHEN ---
When('eu adiciono {string} ao carrinho', async function (productName: string) {
  await productListPage.addProductToCart(productName);
});

When('eu visualizo o carrinho de compras', async function () {
  await productListPage.goToCart();
  await cartPage.expectProductInCart('Sauce Labs Backpack', 1); // Validar o produto adicionado
});

When('eu continuo para o checkout', async function () {
  await cartPage.proceedToCheckout();
});

When('eu preencho os dados de entrega no checkout:', async function (dataTable: DataTable) {
  const data = dataTable.hashes()[0];
  await checkoutPage.fillShippingDetails(data.Nome, data.Sobrenome, data.CEP);
});

When('eu finalizo a compra', async function () {
  await checkoutPage.finalizeOrder();
});

// --- THEN ---
Then('eu devo ver uma mensagem de {string}', async function (expectedMessage: string) {
  await orderConfirmationPage.expectSuccessMessage(expectedMessage);
});

Then('eu devo estar na página de confirmação de pedido', async function () {
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await orderConfirmationPage.expectOrderNumber(); // Validação adicional de texto na página
  await browser.close(); // Fechar o navegador ao final do cenário
});