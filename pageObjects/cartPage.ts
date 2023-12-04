import { Locator, Page } from '@playwright/test';

export class CartPage {
    public readonly url = 'basket';
    private readonly page: Page;
    private readonly siteErrorLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siteErrorLocator = page.locator('//div[@class="site-error"]');
    }

    async getSiteErrorMessage() {
        return this.siteErrorLocator;
    }
}

