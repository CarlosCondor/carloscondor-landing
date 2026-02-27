import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Juan Carlos Delgado');
  });

  test('displays profile image', async ({ page }) => {
    const profileImg = page.locator('.profile-image img');
    await expect(profileImg).toBeVisible();
    await expect(profileImg).toHaveAttribute('src', '/images/yo.jpg');
    await expect(profileImg).toHaveAttribute('alt', 'Juan Carlos Delgado');
  });

  test('displays name and subtitle', async ({ page }) => {
    await expect(page.locator('.container h1')).toHaveText('Juan Carlos Delgado');
    await expect(page.locator('.subtitle')).toHaveText(
      'CTO / CPO / Software Engineer',
    );
  });

  test('has all navigation links with correct destinations', async ({
    page,
  }) => {
    const links = page.locator('.links .link');
    await expect(links).toHaveCount(5);

    const expectedLinks = [
      { text: 'Productos recomendados', href: '/picks' },
      {
        text: 'Blog',
        href: 'https://CarlosCondor.github.io/',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      { text: 'Contacto', href: 'mailto:j.carloscondor@gmail.com' },
      {
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/in/juan-carlos-%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB-delgado-jaramillo-200a0330/',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      {
        text: 'GitHub',
        href: 'https://github.com/carloscondor',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ];

    for (let i = 0; i < expectedLinks.length; i++) {
      const link = links.nth(i);
      await expect(link).toHaveText(expectedLinks[i].text);
      await expect(link).toHaveAttribute('href', expectedLinks[i].href);

      if ('target' in expectedLinks[i]) {
        await expect(link).toHaveAttribute('target', expectedLinks[i].target);
      }
      if ('rel' in expectedLinks[i]) {
        await expect(link).toHaveAttribute('rel', expectedLinks[i].rel);
      }
    }
  });

  test('meta description is set correctly', async ({ page }) => {
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute(
      'content',
      'Web personal de Juan Carlos Delgado, CTO / CPO',
    );
  });

  test('page has correct lang attribute', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});
