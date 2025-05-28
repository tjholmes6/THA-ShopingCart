import { expect } from "@playwright/test";
import { test } from '../fixtures/CartFixture';

const headphones = 'Headphones';
const tShirt = 'T-shirt';
const mug = 'Mug';

test('Validate checkout enabled after removing OOS items', async ({ cartPage }) => {
  // Initial state check
  await expect(cartPage.checkoutButton).toBeDisabled();

  // Action: Remove out-of-stock items
  const items = await cartPage.getCartItems();
  for (const item of items) {
    if (await item.isOutOfStock()) {
      await item.remove();
    }
  }

  // Final state check
  await expect(cartPage.checkoutButton).toBeEnabled();
});

test('T-shirt shows limited stock icon', async ({ cartPage }) => {
  const item = await cartPage.getItemByName(tShirt);
  await expect(item.limitedStockIcon).toBeVisible();
});

test('Travel Mug is marked as out of stock', async ({ cartPage }) => {
  const item = await cartPage.getItemByName(mug);
  await expect(item.outOfStockIndicator).toBeVisible();
});

test('Headphones show promo timer', async ({ cartPage }) => {
  const item = await cartPage.getItemByName(headphones);
  await expect(item.promoTimer).toBeVisible();
});

test('Total updates when quantity changes', async({ cartPage }) => {
  const item = await cartPage.getItemByName(headphones);
  
  // Action: Change quantity
  await item.setQuantity(10);
  
  // Assertion: Verify total updates
  await expect(cartPage.totalPrice).toHaveText('$870.99', { timeout: 5000 });
});

test('Negative quantity resets to minimum', async({ cartPage }) => {
  const item = await cartPage.getItemByName(headphones);
  
  // Action: Attempt invalid quantity
  await item.setQuantity(-10);
  
  // Assertion: Verify reset to valid quantity
  await expect(item.quantityInput).toHaveValue('1');
});