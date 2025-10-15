import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppUrls } from '../config/urls';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly firstNameInput = this.page.locator('#first-name');
  private readonly lastNameInput = this.page.locator('#last-name');
  private readonly postalCodeInput = this.page.locator('#postal-code');
  private readonly continueButton = this.page.locator('[data-test="continue"]');

  private readonly finishButton = this.page.locator('[data-test="finish"]');

  async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await expect(this.page).toHaveURL(AppUrls.SAUCE_DEMO_CHECKOUT_STEP_TWO);
  }

  async finalizeOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(AppUrls.SAUCE_DEMO_CHECKOUT_COMPLETE);
  }
}