import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators para SauceDemo
  private readonly cartItems = this.page.locator('.cart_item');
  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  private readonly productQuantityText = (productName: string) => this.page.locator(`.cart_item:has-text("${productName}") .cart_quantity`);
  private readonly productDescriptionText = (productName: string) => this.page.locator(`.cart_item:has-text("${productName}") .inventory_item_name`);


  async expectProductInCart(productName: string, quantity: number) {
    const itemLocator = this.page.locator(`.cart_item:has-text("${productName}")`);
    await expect(itemLocator).toBeVisible();
    await expect(this.productQuantityText(productName)).toHaveText(String(quantity));
    await expect(this.productDescriptionText(productName)).toHaveText(productName);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  }
}