import { test, expect } from '@playwright/test';

test.describe('Cross-page Navigation', () => {
  test('Home → Picks via "Productos recomendados" link', async ({ page }) => {
    await page.goto('/');
    await page.locator('.links a', { hasText: 'Productos recomendados' }).click();
    await expect(page).toHaveURL('/picks');
    await expect(page.locator('[data-purpose="hero-section"] h1')).toHaveText('Productos que recomiendo');
  });

  test('Picks → Detail via product card click', async ({ page }) => {
    await page.goto('/picks');
    const firstCard = page.locator('[data-picks-grid] [data-pick-card]').first();
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp('/picks/.+'));
    await expect(page.locator('main h1')).not.toBeEmpty();
  });

  test('Detail → Picks via "Volver a Picks" link', async ({ page }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');
    await page.locator('[data-purpose="back-button"]').click();
    await expect(page).toHaveURL('/picks');
  });

  test('Detail → Home via CARLOSCONDOR logo', async ({ page }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');
    await page
      .locator('[data-purpose="main-nav"] a', { hasText: 'CARLOSCONDOR' })
      .click();
    await expect(page).toHaveURL('/');
  });

  test('Navbar links work from picks catalog page', async ({ page }) => {
    await page.goto('/picks');

    const inicioLink = page.locator('[data-purpose="main-nav"] a', {
      hasText: 'Inicio',
    });
    await expect(inicioLink).toHaveAttribute('href', '/');
  });

  test('Navbar links work from detail page', async ({ page }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');

    const inicioLink = page.locator('[data-purpose="main-nav"] a', {
      hasText: 'Inicio',
    });
    await expect(inicioLink).toHaveAttribute('href', '/');

    const picksLink = page.locator('[data-purpose="main-nav"] a', {
      hasText: 'Picks',
    });
    await expect(picksLink).toHaveAttribute('href', '/picks');
  });

  test('Footer navigation links work from picks page', async ({ page }) => {
    await page.goto('/picks');

    const footer = page.locator('[data-purpose="footer-links"]').first();
    await expect(footer.locator('a', { hasText: 'Inicio' })).toHaveAttribute(
      'href',
      '/',
    );
    await expect(footer.locator('a', { hasText: 'Picks' })).toHaveAttribute(
      'href',
      '/picks',
    );
  });

  test('Detail → Related product navigates correctly', async ({ page }) => {
    await page.goto('/picks/raspberry-pi-5-8gb/');

    const relatedSection = page.locator('main section', {
      has: page.locator('h2', { hasText: /Más en/ }),
    });

    const firstRelated = relatedSection.locator('a.group').first();
    const relatedHref = await firstRelated.getAttribute('href');
    expect(relatedHref).toMatch(/^\/picks\/.+\/$/);

    await firstRelated.click();
    await expect(page).toHaveURL(new RegExp('/picks/.+'));
    await expect(page.locator('main h1')).not.toBeEmpty();
  });
});
