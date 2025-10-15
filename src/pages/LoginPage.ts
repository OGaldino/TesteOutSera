import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AppUrls } from '../config/urls';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly usernameInput = this.page.locator('#user-name'); 
  private readonly passwordInput = this.page.locator('#password');   
  private readonly loginButton = this.page.locator('#login-button');
  private readonly errorMessage = this.page.locator('#error-message'); 

  async gotoLoginPage() {
    await this.navigateTo(AppUrls.SAUCE_DEMO_LOGIN);
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedInSuccessfully() {
    await expect(this.page).toHaveURL(AppUrls.SAUCE_DEMO_PRODUCTS);
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}