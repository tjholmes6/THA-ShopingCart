# 🧪 Shopping Cart Demo - Test Strategy

This project contains an end-to-end test suite for a shopping cart demo application using **Playwright + TypeScript**. The suite covers functional flows, edge cases, UI validation, and outlines a strategy for performance testing.

---

## ✅ Overview

This is a single-page shopping cart UI where users can:

- Adjust item quantities
- Remove items
- Proceed to checkout (with restrictions)
- View item-specific indicators (e.g. promo, limited stock, out of stock)

Test coverage focuses on verifying that all interactions behave as expected and validating visual or behavioral indicators for each item in the cart.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm 8+

### Setup

```bash
git clone https://github.com/tjholmes6/THA-ShopingCart
cd THA-ShopingCart
npm install
```
### Running Tests
```bash
npm test           # Run all tests
npm run test:report  # View interactive HTML report
```

## 🧪 Functional Test Cases
| ID     | Scenario                           | Expected Result                                       |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| TC-001 | Click "Checkout"                   | Should transition to the payment page (Not validated) |
| TC-002 | Change quantity of item            | Cart total updates correctly                          |
| TC-003 | Remove item from cart              | Item removed, total updates                           |
| TC-004 | Promo item expires (mocked)        | Promo item removed, total updates                     |
| TC-005 | Enter negative quantity            | Quantity resets to 1, validation shown                |
| TC-006 | Promo timer is visible             | Promo timer appears for eligible items                |
| TC-007 | Limited stock icon visible         | Icon appears on limited stock item                    |
| TC-008 | Out-of-stock item affects checkout | Row is styled, checkout is disabled                   |

## 🧪 Edge Case Tests
| ID     | Scenario                        | Expected Behavior              |
| ------ | ------------------------------- | ------------------------------ |
| EC-001 | Quantity set to 0               | Treated as invalid, reset to 1 |
| EC-002 | Extremely large quantity        | UI should remain usable        |
| EC-003 | Remove all items                | Show empty cart state          |
| EC-004 | Use browser back after checkout | Should not re-submit purchase  |

## 🧪 Automated Tests
| ID     | Covered Scenario           | Test Implementation                                            |
| ------ | -------------------------- | -------------------------------------------------------------- |
| TC-002 | Update quantity            | `test('Check that total updates after adding 9 headphones')`   |
| TC-003 | Remove out-of-stock item   | `test('Validate you can checkout after removing an OOS item')` |
| TC-005 | Enter negative quantity    | `test('Check for negative quantity to be invalid')`            |
| TC-006 | Promo timer for Headphones | `test('Bluetooth Headphones show promo timer')`                |
| TC-007 | Limited stock for T-shirt  | `test('T-shirt shows limited stock icon')`                     |
| TC-008 | Travel Mug is out of stock | `test('Travel Mug is marked as out of stock')`                 |

## ⚙️ Automation Notes

Tests are written with Playwright using the Page Object Model (POM). Each cart item is represented as a type-safe object, and the test suite is backed by custom fixtures for consistent setup.
Promo Expiry (Mocking Example)
```ts
jest.useFakeTimers();
promoManager.startTimer();
jest.advanceTimersByTime(1000 * 60 * 15);
```
## ⚡ Performance Testing Strategy

Client-Side (Lighthouse)

    Time to Interactive (TTI)

    Largest Contentful Paint (LCP)

    Total Blocking Time (TBT)

    Bundle size

Server-Side

    Benchmark key endpoints:

        /api/cart/update

        /api/checkout/initiate

    🎯 Expected Response Time: <200ms

Load Testing

    Use tools like k6, Artillery, or Locust

    Simulate peak traffic based on sale-day usage

    Test both:

        Scaled environment (cloud-autoscaling)

        Fixed-agent environment (to identify failure limits)

## ♿ Accessibility Testing
| Element          | Standard                      | Tools                |
| ---------------- | ----------------------------- | -------------------- |
| Inputs & Buttons | ARIA roles and labels         | axe, Lighthouse |
| Keyboard Focus   | Fully navigable with keyboard | axe             |
| Color Contrast   | Meets WCAG 2.1 AA             | Lighthouse           |

## 🌍 Test Environments
| Environment | Purpose                          |
| ----------- | -------------------------------- |
| local-dev   | Mock-enabled development testing |
| qa          | End-to-end validation            |
| perf        | Load and performance simulations |

## 🧭 Future Improvements

    Add CI/CD integration (e.g. GitHub Actions)

    Snapshot diffing to catch visual regressions

    Add dynamic quantity/randomized input testing

    Use money class for more precise total calculations

Feel free to explore the repo and run the test suite. Feedback and improvements always welcome!

– Timothy Holmes
