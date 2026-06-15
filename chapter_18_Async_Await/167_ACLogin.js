import { test, expect } from '@playwright/test';

test('logs in with valid credentials @p0', async ({ page }) => {
    await test.step('Login as standard_user', async () => {
        log.info('Logging in as standard_user');
        await loginPage.loginAs('standard_user', 'tta_secret');
    });

    await test.step('Verify login form is no longer shown', async () => {
        log.info('Asserting login form is hidden after login');
        await expect(page.locator('[data-test="login-button"]')).toBeHidden();
    });
});



import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});