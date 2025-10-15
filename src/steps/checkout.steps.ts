// src/steps/checkout.steps.ts
import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';

import { LoginPage } from '../pages/LoginPage'; 
import { ProductListPage } from '../pages/ProductListPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';


let page: Page;
let loginPage: LoginPage;
let productListPage: ProductListPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let orderConfirmationPage: OrderConfirmationPage;

Given('que estou logado no SauceDemo', async function () {
  loginPage = new LoginPage(this.page);
  productListPage = new ProductListPage(this.page);
  cartPage = new CartPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
  orderConfirmationPage = new OrderConfirmationPage(this.page);

  await loginPage.gotoLoginPage();
  await loginPage.login('standard_user', 'secret_sauce');
  await productListPage.expectOnProductListPage();
});

When('eu adiciono {string} ao carrinho', async function (productName: string) {
  await productListPage.addProductToCart(productName);
});

When('eu visualizo o carrinho de compras', async function () {
  await productListPage.goToCart();
  await cartPage.expectProductInCart('Sauce Labs Backpack', 1);
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

Then('eu devo ver uma mensagem de {string}', async function (expectedMessage: string) {
  await orderConfirmationPage.expectSuccessMessage(expectedMessage);
});

Then('eu devo estar na página de confirmação de pedido', async function () {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await orderConfirmationPage.expectOrderNumber();
});