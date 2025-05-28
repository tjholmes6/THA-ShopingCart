import { Locator } from '@playwright/test';

export class CartItem {
  readonly row: Locator;
  readonly name: string;
  readonly quantityInput: Locator;
  readonly priceLabel: Locator;
  readonly removeButton: Locator;
  readonly limitedStockIcon: Locator;
  readonly promoTimer: Locator;
  readonly outOfStockIndicator: Locator;

  constructor(row: Locator, name: string) {
    this.row = row;
    this.name = name;
    this.quantityInput = row.locator('.quantity');
    this.priceLabel = row.locator('.price');
    this.removeButton = row.locator('.remove-item');
    this.limitedStockIcon = row.locator('.availability-warning');
    this.promoTimer = row.locator('#timer');
    this.outOfStockIndicator = row.locator('.out-of-stock');
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
    await this.quantityInput.blur();
    await this.row.page().waitForTimeout(300); // Allow UI to update
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  async getPrice(): Promise<string> {
    return (await this.priceLabel.textContent())?.trim() ?? '';
  }

  async remove() {
    await this.removeButton.click();
    await this.row.page().locator(".confirm-remove").click();
    await this.row.waitFor({ state: 'detached' }); // Wait for item removal
  }

  async hasLimitedStockIcon(): Promise<boolean> {
    return this.limitedStockIcon.isVisible();
  }

  async hasPromoTimer(): Promise<boolean> {
    return this.promoTimer.isVisible();
  }

  async isOutOfStock(): Promise<boolean> {
    return this.outOfStockIndicator.isVisible();
  }
}