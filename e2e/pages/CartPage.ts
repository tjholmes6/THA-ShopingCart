import { Page, Locator } from '@playwright/test';
import { CartItem } from './CartItems';

export class CartPage {
  readonly page: Page;
  readonly cartGrid: Locator;
  readonly checkoutButton: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartGrid = page.locator('#cartContainer');
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.totalPrice = page.locator('#totalAmount');
  }

  async goTo() {
    await this.page.goto('');
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.cartGrid.first().waitFor({ state: 'visible' });
    await this.checkoutButton.first().waitFor({ state: 'visible' });
  }

  async getCartItems(): Promise<CartItem[]> {
    await this.cartGrid.locator('.cart-item').first().waitFor({ state: 'visible' });
    const rows = this.cartGrid.locator('.cart-item');
    const count = await rows.count();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const name = (await row.locator('.product-name').textContent())?.trim();
      if (name) items.push(new CartItem(row, name));
    }

    return items;
  }

  async getItemByName(name: string): Promise<CartItem> {
    await this.cartGrid.locator('.cart-item').first().waitFor({ state: 'visible' });
    const rows = this.cartGrid.locator('.cart-item');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const nameEl = row.locator('.product-name');
      const itemName = (await nameEl.textContent())?.trim() || '';
      if (itemName.includes(name)) return new CartItem(row, itemName);
    }

    throw new Error(`No cart item containing "${name}" found`);
  }

  async getTotal(): Promise<string> {
    await this.totalPrice.waitFor({ state: 'visible' });
    return (await this.totalPrice.textContent())?.trim() ?? '';
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout/, { timeout: 10000 });
  }
}