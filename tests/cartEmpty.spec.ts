import { expect, test } from '../fixtures/baseFixture';
import { APP_URL, user } from '../config';

test('TC-1: Go to empty cart', async ({ page, loginPage, cartPage, mainPage }) => {
    await expect(await mainPage.NavBar.getUserName()).toHaveText(user.username);

    const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

    expect(await cartDropDown.isOpened()).toBe(true);

    await cartDropDown.goToCart();

    const currentUrl = page.url();

    expect(currentUrl).toBe(APP_URL + cartPage.url);
    await expect(await cartPage.getSiteErrorMessage()).toBeHidden();
});

