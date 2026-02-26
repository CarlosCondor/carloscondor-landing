import { test, expect } from '@playwright/test';

/** First product slug for deterministic tests */
const FIRST_SLUG = 'raspberry-pi-5-8gb';
const FIRST_TITLE = 'Raspberry Pi 5 8GB';
const FIRST_BRAND = 'Selección personal';
const FIRST_CATEGORY_LABEL = 'Espacio de trabajo';
const FIRST_PRICE = '139 €';
const FIRST_AFFILIATE_URL = 'https://amzn.to/4tYgNWz';

/** All slugs for iteration tests */
const ALL_SLUGS = [
  'raspberry-pi-5-8gb',
  'tp-link-re700x-repetidor-wifi-6',
  'ergosolid-brazo-monitor-ergonomico',
  'nutralie-magnesio-citrato-bisglicinato',
  'hsn-creatina-creapure-monohidrato-500g',
  'nutravita-omega-3-2000mg-240-capsulas',
  'gloryfeel-melatonina-400-tabletas',
  'outin-nano-cafetera-espresso-portatil',
  'songmics-escritorio-electrico-180x80',
];

test.describe('Pick Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/picks/${FIRST_SLUG}/`);
  });

  test('page loads with product-specific title', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(FIRST_TITLE));
  });

  test('displays product title, brand, category, and price', async ({
    page,
  }) => {
    await expect(page.locator('main h1')).toHaveText(FIRST_TITLE);
    await expect(page.locator('main')).toContainText(FIRST_BRAND);
    await expect(page.locator('main')).toContainText(FIRST_CATEGORY_LABEL);
    await expect(page.locator('main')).toContainText(FIRST_PRICE);
  });

  test('hero image is visible with correct alt text', async ({ page }) => {
    const heroImg = page.locator('[data-purpose="hero-image"]');
    await expect(heroImg).toBeVisible();
    await expect(heroImg).toHaveAttribute('alt', FIRST_TITLE);
  });

  test('"Ver producto" button has correct affiliate URL and rel', async ({
    page,
  }) => {
    const affiliateLink = page.locator('main a', { hasText: 'Ver producto' });
    await expect(affiliateLink).toHaveAttribute('href', FIRST_AFFILIATE_URL);
    await expect(affiliateLink).toHaveAttribute('target', '_blank');
    await expect(affiliateLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('"Volver a Picks" link exists and works', async ({ page }) => {
    const backLink = page.locator('[data-purpose="back-button"]');
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/picks');
    await expect(backLink).toContainText('Volver a Picks');
  });

  test('description section is present', async ({ page }) => {
    await expect(
      page.locator('main h2', { hasText: 'Por qué lo recomiendo' }),
    ).toBeVisible();
  });

  test('related products section shows items', async ({ page }) => {
    const relatedSection = page.locator('main section', {
      has: page.locator('h2', { hasText: /Más en/ }),
    });
    await expect(relatedSection).toBeVisible();

    const relatedLinks = relatedSection.locator('a.group');
    const count = await relatedLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(3);
  });

  test('"Explorar categorías" section is present', async ({ page }) => {
    await expect(
      page.locator('main h2', { hasText: 'Explorar categorías' }),
    ).toBeVisible();
  });

  test('navbar is present with correct links', async ({ page }) => {
    const nav = page.locator('[data-purpose="main-nav"]');
    await expect(nav).toBeVisible();

    await expect(
      nav.locator('a', { hasText: 'CARLOSCONDOR' }),
    ).toHaveAttribute('href', '/');
  });
});

test.describe('Pick Detail — All Products Render', () => {
  for (const slug of ALL_SLUGS) {
    test(`product page /picks/${slug}/ loads without errors`, async ({
      page,
    }) => {
      const response = await page.goto(`/picks/${slug}/`);
      expect(response?.status()).toBe(200);

      // Basic structural checks — scoped to main to avoid Astro toolbar
      await expect(page.locator('main h1')).not.toBeEmpty();
      await expect(page.locator('[data-purpose="hero-image"]')).toBeVisible();
      await expect(
        page.locator('main a', { hasText: 'Ver producto' }),
      ).toBeVisible();
      await expect(
        page.locator('[data-purpose="back-button"]'),
      ).toBeVisible();
    });
  }
});
