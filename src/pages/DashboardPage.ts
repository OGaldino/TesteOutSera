import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Seletores
  private readonly welcomeMessage = this.page.locator('.welcome-banner');
  private readonly specificFormLink = this.page.locator('a[href="/form"]');

  async expectOnDashboard() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.welcomeMessage).toContainText('Welcome');
  }

  async navigateToSpecificForm() {
    await this.specificFormLink.click();
    await expect(this.page).toHaveURL(/.*\/form/);
    await expect(this.page.locator('h1')).toContainText('Formulário de Detalhes');
  }
}