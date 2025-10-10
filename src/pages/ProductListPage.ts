import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly inventoryPageTitle = this.page.locator('.title');
  private readonly productCard = (productName: string) => this.page.locator(`.inventory_item:has-text("${productName}")`);
  
  private readonly initialAddToCartButton = (productName: string) => this.productCard(productName).locator('button:has-text("Add to cart")');
  
  private readonly productInventoryButton = (productName: string) => this.productCard(productName).locator('.btn_inventory');

  private readonly cartIcon = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');

  async expectOnProductListPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
    await expect(this.inventoryPageTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    await this.initialAddToCartButton(productName).click();
    
    await expect(this.productInventoryButton(productName)).toHaveText('Remove');

    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText('1'); 
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }
}