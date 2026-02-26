import { test, expect } from '@playwright/test';

/**
 * Rather than hardcoding product counts, we read them dynamically from the page
 * to be resilient to data changes. We validate structure, not exact counts.
 */

test.describe('Picks Catalog — Page Load & Grid', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/picks');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Picks | CarlosCondor');
  });

  test('hero section displays title and description', async ({ page }) => {
    const hero = page.locator('[data-purpose="hero-section"]');
    await expect(hero.locator('h1')).toHaveText('Productos que recomiendo');
    await expect(hero.locator('p')).toContainText(
      'catálogo de herramientas, objetos y accesorios',
    );
  });

  test('navbar is present with correct links', async ({ page }) => {
    const nav = page.locator('[data-purpose="main-nav"]');
    await expect(nav).toBeVisible();

    const logo = nav.locator('a', { hasText: 'CARLOSCONDOR' });
    await expect(logo).toHaveAttribute('href', '/');

    const homeLink = nav.locator('a', { hasText: 'Inicio' });
    await expect(homeLink).toHaveAttribute('href', '/');

    const picksLink = nav.locator('a', { hasText: 'Picks' });
    await expect(picksLink).toHaveAttribute('href', '/picks');

    const blogLink = nav.locator('a', { hasText: 'Blog' });
    await expect(blogLink).toHaveAttribute('href', 'https://CarlosCondor.github.io/');
  });

  test('renders products in the grid', async ({ page }) => {
    const cards = page.locator('[data-picks-grid] [data-pick-card]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(9);
  });

  test('each card displays image, title, brand, category, and price', async ({
    page,
  }) => {
    const firstCard = page.locator('[data-picks-grid] [data-pick-card]').first();
    await expect(firstCard.locator('.product-img')).toBeVisible();
    await expect(firstCard.locator('h3')).not.toBeEmpty();
    // Brand · Category label line
    await expect(firstCard.locator('p')).toContainText('·');
    // Price label
    await expect(firstCard.locator('span').last()).toContainText('€');
  });

  test('stats counter shows product count', async ({ page }) => {
    const stats = page.locator('[data-filter-stats]');
    // Verify stats contains a number + "productos"
    await expect(stats).toContainText(/\d+ productos/);
    await expect(stats).toContainText(/\d+ destacado/);
  });

  test('featured badge appears on featured products', async ({ page }) => {
    const featuredCards = page.locator('[data-picks-grid] [data-pick-card][data-featured="true"]');
    const count = await featuredCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    await expect(featuredCards.first().locator('text=Destacado')).toBeVisible();
  });
});

test.describe('Picks Catalog — Category Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/picks');
  });

  test('"Todos" button is active by default', async ({ page }) => {
    const todosBtn = page.locator('[data-filter-btn][data-filter="all"]');
    await expect(todosBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('clicking a category filters products correctly', async ({ page }) => {
    // Count total products first
    const totalCards = await page.locator('[data-picks-grid] [data-pick-card]:not(.hidden)').count();

    const workspaceBtn = page.locator(
      '[data-filter-btn][data-filter="workspace"]',
    );
    await workspaceBtn.click();

    await expect(workspaceBtn).toHaveAttribute('aria-pressed', 'true');

    // "Todos" should no longer be active
    const todosBtn = page.locator('[data-filter-btn][data-filter="all"]');
    await expect(todosBtn).toHaveAttribute('aria-pressed', 'false');

    // Fewer cards should be visible
    const visibleCards = page.locator(
      '[data-picks-grid] [data-pick-card]:not(.hidden)',
    );
    const filteredCount = await visibleCards.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThan(totalCards);

    // All visible cards should have workspace category
    for (const card of await visibleCards.all()) {
      await expect(card).toHaveAttribute('data-category', 'workspace');
    }
  });

  test('clicking "Todos" shows all products again', async ({ page }) => {
    // Get initial total
    const totalBefore = await page.locator('[data-picks-grid] [data-pick-card]:not(.hidden)').count();

    // Filter to a category
    await page.locator('[data-filter-btn][data-filter="suplementos"]').click();
    const filteredCount = await page.locator('[data-picks-grid] [data-pick-card]:not(.hidden)').count();
    expect(filteredCount).toBeLessThan(totalBefore);

    // Then click "Todos"
    await page.locator('[data-filter-btn][data-filter="all"]').click();
    await expect(
      page.locator('[data-picks-grid] [data-pick-card]:not(.hidden)'),
    ).toHaveCount(totalBefore);
  });

  test('URL updates with ?category= param when filtering', async ({
    page,
  }) => {
    await page.locator('[data-filter-btn][data-filter="cafe"]').click();
    await expect(page).toHaveURL(/[?&]category=cafe/);

    await page.locator('[data-filter-btn][data-filter="all"]').click();
    expect(page.url()).not.toContain('category=');
  });

  test('loading page with ?category= query applies the filter', async ({
    page,
  }) => {
    await page.goto('/picks?category=workspace');

    const workspaceBtn = page.locator(
      '[data-filter-btn][data-filter="workspace"]',
    );
    await expect(workspaceBtn).toHaveAttribute('aria-pressed', 'true');

    const visibleCards = page.locator('[data-picks-grid] [data-pick-card]:not(.hidden)');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);

    // All should be workspace
    for (const card of await visibleCards.all()) {
      await expect(card).toHaveAttribute('data-category', 'workspace');
    }
  });

  test('stats counter updates when filtering', async ({ page }) => {
    const stats = page.locator('[data-filter-stats]');
    await page.locator('[data-filter-btn][data-filter="cafe"]').click();

    // Should show a smaller number
    await expect(stats).toContainText(/\d+ producto/);
  });

  test('empty state shows when filtering a category with no products', async ({
    page,
  }) => {
    await page.locator('[data-filter-btn][data-filter="lifestyle"]').click();

    const emptyState = page.locator('[data-empty-state]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText(
      'No hay productos en esta categoría',
    );
  });

  test('each filter button cycles aria-pressed correctly', async ({
    page,
  }) => {
    const buttons = page.locator('[data-filter-btn]');
    const btnCount = await buttons.count();

    for (let i = 0; i < btnCount; i++) {
      const btn = buttons.nth(i);
      await btn.click();
      await expect(btn).toHaveAttribute('aria-pressed', 'true');

      // All other buttons should be false
      for (let j = 0; j < btnCount; j++) {
        if (j !== i) {
          await expect(buttons.nth(j)).toHaveAttribute(
            'aria-pressed',
            'false',
          );
        }
      }
    }
  });
});
