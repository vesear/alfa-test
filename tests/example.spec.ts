import { test } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://enotes.pointschool.ru/login');
    await page.pause();
});
