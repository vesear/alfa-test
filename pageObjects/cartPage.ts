import { Locator, Page } from '@playwright/test';
import Routes from '../api/constants/routes';

export class CartPage {
    public readonly url = Routes.Basket;
    private readonly siteErrorLocator: Locator;

    constructor(page: Page) {
        this.siteErrorLocator = page.locator('//div[@class="site-error"]');
    }

    async getSiteErrorMessage() {
        return this.siteErrorLocator;
    }
}

