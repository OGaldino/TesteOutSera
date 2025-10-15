import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Localizadores SauceDemo
  private readonly completeHeader = this.page.locator('#checkout_complete_container');
  private readonly completeText = this.page.locator('#checkout_complete_container .complete-text');

  async expectSuccessMessage(message: string) {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toContainText(message);
  }

  async expectOrderNumber() {
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }
}