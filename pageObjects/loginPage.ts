import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url: string = '/login';
    readonly loginInputLocator: Locator;
    readonly passwordInputLocator: Locator;
    readonly signInButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInputLocator = page.locator('#loginform-username');
        this.passwordInputLocator = page.locator('#loginform-password');
        this.signInButtonLocator = page.locator("//button[@name='login-button']");
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login({ username, password }) {
        await this.loginInputLocator.pressSequentially(username);
        await this.passwordInputLocator.pressSequentially(password);
        await this.signInButtonLocator.click();
    }
}
