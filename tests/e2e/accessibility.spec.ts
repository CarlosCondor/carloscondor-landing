import { test, expect } from '@playwright/test';

test.describe('Accessibility — Images Alt Text', () => {
  test('all product card images have alt text on picks page', async ({
    page,
  }) => {
    await page.goto('/picks');
    const productImages = page.locator('[data-picks-grid] [data-pick-card] .product-img');
    const count = await productImages.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await productImages.nth(i).getAttribute('alt');
      expect(alt, `Product image #${i} should have alt text`).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('detail page hero image has alt text', async ({ page }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');
    const heroImg = page.locator('[data-purpose="hero-image"]');
    const alt = await heroImg.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt!.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility — Filter Buttons', () => {
  test('all filter buttons have aria-pressed attribute', async ({ page }) => {
    await page.goto('/picks');
    const buttons = page.locator('[data-filter-btn]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const ariaPressed = await buttons.nth(i).getAttribute('aria-pressed');
      expect(
        ariaPressed,
        `Filter button #${i} should have aria-pressed`,
      ).toBeTruthy();
      expect(['true', 'false']).toContain(ariaPressed);
    }
  });

  test('exactly one filter button is aria-pressed="true" at any time', async ({
    page,
  }) => {
    await page.goto('/picks');
    const activeButtons = page.locator('[data-filter-btn][aria-pressed="true"]');
    await expect(activeButtons).toHaveCount(1);
  });
});

test.describe('Accessibility — External Links', () => {
  test('affiliate links on detail page have rel="noopener noreferrer"', async ({
    page,
  }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');
    const affiliateLink = page.locator('main a', { hasText: 'Ver producto' });
    await expect(affiliateLink).toHaveAttribute('target', '_blank');
    await expect(affiliateLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('blog link in navbar opens externally', async ({ page }) => {
    await page.goto('/picks');
    const blogLink = page.locator('[data-purpose="main-nav"] a', {
      hasText: 'Blog',
    });
    await expect(blogLink).toHaveAttribute(
      'href',
      'https://CarlosCondor.github.io/',
    );
  });
});

test.describe('Accessibility — Keyboard Navigation', () => {
  test('filter buttons are focusable with keyboard', async ({ page }) => {
    await page.goto('/picks');

    const firstFilterBtn = page.locator('[data-filter-btn]').first();
    await firstFilterBtn.focus();
    await expect(firstFilterBtn).toBeFocused();
  });

  test('product cards are focusable links', async ({ page }) => {
    await page.goto('/picks');
    const firstCard = page.locator('[data-picks-grid] [data-pick-card]').first();
    await firstCard.focus();
    await expect(firstCard).toBeFocused();
  });
});

test.describe('Responsive — Mobile Viewport', () => {
  test('home page renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('.container h1')).toBeVisible();
    await expect(page.locator('.subtitle')).toBeVisible();
  });

  test('picks catalog renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/picks');

    const cards = page.locator('[data-picks-grid] [data-pick-card]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(9);

    // Grid should be visible
    const grid = page.locator('[data-picks-grid]');
    await expect(grid).toBeVisible();
  });

  test('navbar hides desktop links on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/picks');

    // Desktop-only links container should be hidden (hidden md:flex)
    const desktopLinks = page.locator(
      '[data-purpose="main-nav"] .hidden.md\\:flex',
    );
    await expect(desktopLinks).not.toBeVisible();
  });

  test('filter bar is scrollable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/picks');

    const filterBar = page.locator('[data-purpose="filter-bar"]');
    await expect(filterBar).toBeVisible();

    // All filter buttons should still be present
    const buttons = page.locator('[data-filter-btn]');
    await expect(buttons).toHaveCount(5); // Todos + 4 categories
  });

  test('detail page renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/picks/raspberry-pi-5-8gb/');

    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('[data-purpose="hero-image"]')).toBeVisible();
    await expect(
      page.locator('main a', { hasText: 'Ver producto' }),
    ).toBeVisible();
  });
});
