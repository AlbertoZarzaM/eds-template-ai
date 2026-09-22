const { expect, test } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // wait for the EDS decorate pipeline to finish before each test
  await page.addInitScript(() => {
    window.hlx = window.hlx || {};
    window.hlx.ready = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve());
    });
  });
});

test('home page loads', async ({ page }) => {
  const response = await page.goto('/');
  test.skip(response.status() === 404, 'no content published for this site yet');
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('main section')).not.toHaveCount(0);
});

test('header and footer are decorated', async ({ page }) => {
  const response = await page.goto('/');
  test.skip(response.status() === 404, 'no content published for this site yet');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('content is decorated into blocks', async ({ page }) => {
  const response = await page.goto('/');
  test.skip(response.status() === 404, 'no content published for this site yet');
  await expect(page.locator('main .block').first()).toBeVisible();
});
