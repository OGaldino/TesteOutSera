import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators para SauceDemo - Step One (Dados de Entrega)
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');

  // Locators para SauceDemo - Step Two (Visão Geral)
  private readonly finishButton = this.page.locator('[data-test="finish"]');

  async fillShippingDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  }

  async finalizeOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  }
}