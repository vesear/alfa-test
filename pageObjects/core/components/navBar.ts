import { Locator, Page } from '@playwright/test';
import { CartDropDown } from './cartDropDown';

export class NavBar {
    private readonly page: Page;
    private readonly navBar: Locator;
    private readonly cartContainer: Locator;
    private readonly cartBadge: Locator;
    private readonly openCartDropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = page.locator('#navbarNav');
        this.cartContainer = page.locator('#basketContainer');
        this.cartBadge = this.cartContainer.locator(
            "//span[contains(@class, 'basket-count-items')]"
        );
        this.openCartDropDown = page.locator('#dropdownBasket');
    }

    async getCartBadgeCount() {
        return this.cartBadge;
    }

    async clickOpenCartDropDown() {
        // DEVNOTE: Timeout needed to wait for badge render due to an error
        //          while opening empty cart
        await this.page.pause();
        await this.openCartDropDown.click();
        const cartDropDown = new CartDropDown(this.page);
        await cartDropDown.waitForOpened();
        return cartDropDown;
    }
}
