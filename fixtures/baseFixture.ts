import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { MainPage } from '../pageObjects/mainPage/mainPage';
import { CartPage } from '../pageObjects/cartPage';
import clearBasket from '../api/services/clearBasket';
import useApiAuthorize from '../api/useApiAuthorize';
import { user } from '../config';

type PageObjects = {
    loginPage: LoginPage;
    mainPage: MainPage;
    cartPage: CartPage;
};

export const test = base.extend<PageObjects>({
    /**
     * The use of UI login is deprecated, use useApiAuthorize instead.
     * @deprecated
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(user);
        await use(loginPage);
    },

    mainPage: async ({ page }, use) => {
        const token = await useApiAuthorize(page);
        await clearBasket({ page, token });
        await page.goto('');
        const mainPage = new MainPage(page);
        await use(mainPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export { expect } from '@playwright/test';
