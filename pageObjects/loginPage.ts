import { type Page } from '@playwright/test';
import { User } from '../config';
import Routes from '../api/constants/routes';

export class LoginPage {
    private readonly url = Routes.Login;
    private readonly page;
    private readonly loginInputLocator;
    private readonly passwordInputLocator;
    private readonly signInButtonLocator;

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
