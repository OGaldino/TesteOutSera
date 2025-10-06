import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly inventoryPageTitle = this.page.locator('.title');
  private readonly productCard = (productName: string) => this.page.locator(`.inventory_item:has-text("${productName}")`);
  
  // NOVO: Locator para o botão "Add to cart" (usado para o clique inicial)
  private readonly initialAddToCartButton = (productName: string) => this.productCard(productName).locator('button:has-text("Add to cart")');
  
  // NOVO: Locator MAIS GENÉRICO para o botão de inventário (usado para verificar o texto APÓS o clique)
  private readonly productInventoryButton = (productName: string) => this.productCard(productName).locator('.btn_inventory');

  private readonly cartIcon = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');

  async expectOnProductListPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.inventoryPageTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    // 1. Clica no botão "Add to cart" (usando o locator que busca "Add to cart")
    await this.initialAddToCartButton(productName).click();
    
    // 2. Verifica se o MESMO BOTÃO (agora identificado pelo locator genérico)
    //    mudou seu texto para "Remove"
    await expect(this.productInventoryButton(productName)).toHaveText('Remove');
    
    // 3. Verifica se o ícone do carrinho está visível e tem 1 item
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText('1'); // Boa prática para verificar o contador
  }

  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }
}