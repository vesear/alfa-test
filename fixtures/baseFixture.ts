import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { MainPage } from '../pageObjects/mainPage/mainPage';
import { user } from '../config';

export type PageObjects = {
    loginPage: LoginPage;
    mainPage: MainPage;
};

export const test = base.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(user);
        await use(loginPage);
    },

    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
});
