import { type Page, type Locator } from '@playwright/test';
import { User } from '../config';

export class LoginPage {
    private readonly url: string = 'login';
    private readonly page: Page;
    private readonly loginInputLocator: Locator;
    private readonly passwordInputLocator: Locator;
    private readonly signInButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInputLocator = page.locator('#loginform-username');
        this.passwordInputLocator = page.locator('#loginform-password');
        this.signInButtonLocator = page.locator("//button[@name='login-button']");
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login({ username, password }: User) {
        await this.loginInputLocator.pressSequentially(username);
        await this.passwordInputLocator.pressSequentially(password);
        await this.signInButtonLocator.click();
    }
}
