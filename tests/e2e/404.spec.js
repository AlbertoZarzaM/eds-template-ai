const { expect, test } = require('@playwright/test');

test('non-existent page returns 404', async ({ page }) => {
  const response = await page.goto('/not-a-real-page-xyz');
  expect(response.status()).toBe(404);
});

test('static 404 page is served', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('main')).toBeVisible();
});

test('health check of static assets', async ({ request }) => {
  const head = await request.head('/scripts/aem.js');
  expect(head.ok()).toBeTruthy();
});
