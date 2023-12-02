import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly navBarLocator: Locator;
    readonly cartButtonLocator: Locator;
    readonly goToCartButtonLocator: Locator;
    readonly cartDropDownLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBarLocator = page.locator('#navbarNav');
        this.cartButtonLocator = page.locator('#dropdownBasket');
        this.goToCartButtonLocator = page.locator('//a[text()="Перейти в корзину"]');
        this.cartDropDownLocator = page.locator(
            '//div[contains(@class,"dropdown-menu-right show")]'
        );
    }

    async getNavBarSelector() {
        return this.navBarLocator;
    }

    async goToCart() {
        await this.cartButtonLocator.click();
        await this.goToCartButtonLocator.click();
    }

    async getGoToCartButtonSelector() {
        return this.goToCartButtonLocator;
    }

    async getCartDropDownSelector() {
        return this.cartDropDownLocator;
    }
}
