import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators para SauceDemo
  private readonly completeHeader = this.page.locator('.complete-header');
  private readonly completeText = this.page.locator('.complete-text');

  async expectSuccessMessage(message: string) {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toContainText(message);
  }

  async expectOrderNumber() {
    // SauceDemo não exibe um número de pedido específico nesta página,
    // mas podemos verificar se a mensagem de "Your order has been dispatched" ou similar está lá.
    // Ou, neste caso, o próprio fluxo de sucesso já valida.
    // Adaptado para o SauceDemo, podemos apenas verificar o texto descritivo.
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }
}