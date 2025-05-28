import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

type CartFixtures = {
  cartPage: CartPage;
};

export const test = base.extend<CartFixtures>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await cartPage.goTo();
    await use(cartPage);
  }
});