import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { user } from '../config';
import { MainPage } from '../pageObjects/mainPage';
import { CartPage } from '../pageObjects/cartPage';

test('Go to empty cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(user);

    await expect(await mainPage.getNavBarSelector()).toBeVisible();

    await mainPage.goToCart();

    await expect(await mainPage.getCartDropDownSelector()).toBeVisible();
    await expect(await mainPage.getGoToCartButtonSelector()).toBeVisible();
    await expect(await cartPage.getSiteErrorMessage()).toBeHidden();
});
