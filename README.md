# 🧪 Shopping Cart Demo - Test Strategy

This document outlines the testing strategy for the **Shopping Cart Demo Page**, including functional, boundary, accessibility, and performance testing. The purpose is to ensure all interactions behave as expected under both normal and edge-case conditions.

---

## ✅ Overview

A single-page demo application showcasing a shopping cart interface where users can adjust item quantities, remove products, and proceed to checkout. The goal is to verify accuracy, validation, performance, and resilience under load.

---
# Playwright E2E Test Suite

This project contains end-to-end tests for a shopping cart application using Playwright and TypeScript.

## Prerequisites
- Node.js 16+
- npm 8+

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Runing tests
To run the test you just enter this command
```bash
npm test
```
To view the report
```bash
npm run test:report
```
## 🧪 Test Cases

### Functional Test Cases

| ID     | Scenario                                           | Steps                                                                 | Expected Result                                                     |
|--------|----------------------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| TC-001 | User clicks "Checkout"                             | Click on checkout button                                              | Redirects or loads payment page                                     |
| TC-002 | User changes item quantity                         | Enter new quantity in input field (e.g. 3)                            | Cart total updates to reflect new quantity                          |
| TC-003 | User removes an item                               | Click "remove" icon/button on an item                                | Item disappears from list, total recalculates                       |
| TC-004 | Promo item expires automatically                   | Wait (mock) beyond promo expiration time                              | Promo item removed, total updates                                   |
| TC-005 | User inputs negative quantity                      | Input `-3` in quantity field                                          | Validation error shown, value reset to `1`                          |
| TC-006 | Verify Promo timer is displayed | Check that promo timer is there | For the promo timer to exist and count down
| TC-007 | Verify Limited Stock Icon | Check that an item has the limited stock icon | A ! should appear to an item with limited stock
| TC-008 | Verify out-of-stock status | Check that if an item is out of stock | Should show up red and not be able to checkout
---


### Edge Case & Validation Tests

| ID     | Scenario                           | Expected Behavior                       |
|--------|------------------------------------|-----------------------------------------|
| EC-001 | Enter 0 as quantity                | Treated as invalid, reset to 1          |
| EC-002 | Enter large number (e.g. 9999)     | Cart updates, check for UI breaking     |
| EC-003 | Remove all items                   | Cart should show empty state message    |
| EC-004 | Use browser back after checkout    | Should not re-submit purchase           |

---

### Automated Test Cases

| ID     | Scenario                                      | Steps                                                                 | Expected Result                                                     | Covered by Test                                                                 |
|--------|-----------------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------|
| TC-002 | User changes item quantity (valid)           | Set quantity of headphones to 10                                      | Cart total updates to $870.99                                       | `test('Check that total updates after adding 9 headphones')`                    |
| TC-003 | User removes an item (out-of-stock)          | Remove all out-of-stock items in the cart                             | Checkout button becomes enabled                                     | `test('Validate you can checkout after removing an OOS item')`                  |
| TC-005 | User inputs negative quantity                | Input `-10` in quantity field for headphones                          | Quantity resets to 1                                                | `test('Check for negative quantity to be invalid')`                             |
| TC-006    | Verify promo timer visibility                | Check Headphones item in the cart                                     | Promo timer is visible                                              | `test('Bluetooth Headphones show promo timer')`                                 |
| TC-007    | Verify limited stock indicator               | Check T-shirt item in the cart                                        | Limited stock icon is visible                                       | `test('T-shirt shows limited stock icon')`                                      |
| TC-008    | Verify out-of-stock status                   | Check Travel Mug item in the cart                                     | Out-of-stock indicator is visible                                   | `test('Travel Mug is marked as out of stock')`                                  |
## ⚙️ Automated Testing Notes

**Promo Expiry Mocking Example** (Jest):
```ts
jest.useFakeTimers();
promoManager.startTimer();
jest.advanceTimersByTime(1000 * 60 * 15); // fast-forward 15 mins
```
Tools Suggested:

    🧪 Playwright – UI and interaction testing


## ⚡ Performance & Load Testing

### 📈 Client-Side Performance

Use Lighthouse to measure:

    Time to Interactive (TTI)

    Largest Contentful Paint (LCP)

    Total Blocking Time (TBT)

    Bundle Size

### 🧩 Server-Side Transaction Timing

Key Endpoints:

    /api/cart/update

    /api/checkout/initiate

    🎯 Expected Response Time: < 200ms under normal load

## 🔥 Load Testing Strategy
Scenario: Simulated Peak Usage

    Use tools like k6, Artillery, Locust

    Base on real sale-day usage if data is available

Scenario: Static Scaling Test

    Run with fixed number of servers/agents

    Gradually increase concurrent users

    Monitor:

        Response times

        Memory/CPU

        User experience degradation

        Failure point

    🧠 Insight: Helps identify scaling limits or bottlenecks before cloud auto-scaling compensates

## ♿ Accessibility Testing

Element |	Standard |	Tool(s)|
|-------|------------|---------|
Inputs & Buttons|	Proper ARIA roles & labels|	axe, Lighthouse
Focus Handling	|Keyboard navigation support	|axe
Visual Contrast |	Meets WCAG 2.1 AA contrast ratio |	Lighthouse

## 🌍 Test Environments

Environment |	Description |
|-----------|----------|
local-dev	| mock enabled testing 
qa |	End-to-end functional testing
perf |	Load and performance testing

## 🧪 Future Improvements

    Integrate tests into CI/CD pipeline (e.g. GitHub Actions)

    Track regressions automatically with visual snapshots

    Collect real-world analytics on load times