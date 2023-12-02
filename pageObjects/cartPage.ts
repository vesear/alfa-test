import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly siteErrorLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siteErrorLocator = page.locator('//div[@class="site-error"]');
    }

    async getSiteErrorMessage() {
        return this.siteErrorLocator;
    }
}

