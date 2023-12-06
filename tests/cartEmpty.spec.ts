import { expect, test } from '../fixtures/baseFixture';
import { APP_URL, user } from '../config';

test('TC-1: Go to empty cart', async ({ page, cartPage, mainPage }) => {
    await expect.soft(await mainPage.NavBar.getUserName()).toHaveText(user.username);

    const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

    expect.soft(await cartDropDown.isOpened()).toBe(true);

    await cartDropDown.goToCart();

    const currentUrl = page.url();

    expect.soft(currentUrl).toBe(APP_URL + cartPage.url);
    await expect.soft(await cartPage.getSiteErrorMessage()).toBeHidden();
});

