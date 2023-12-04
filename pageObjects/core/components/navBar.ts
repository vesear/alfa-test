import { Locator, Page } from '@playwright/test';
import { CartDropDown } from './cartDropDown';

export class NavBar {
    private readonly page: Page;
    private readonly cartContainer;
    private readonly cartBadge;
    private readonly openCartDropDown;
    private readonly userDropDown;

    constructor(page: Page) {
        this.page = page;
        this.cartContainer = page.locator('#basketContainer');
        this.cartBadge = this.cartContainer.locator(
            "//span[contains(@class, 'basket-count-items')]"
        );
        this.openCartDropDown = page.locator('#dropdownBasket');
        this.userDropDown = page.locator("//*[@id='dropdownUser']//div[@class='text-uppercase']");
    }

    async getUserName() {
        return this.userDropDown;
    }

    async getCartBadgeCount() {
        return this.cartBadge;
    }

    async clickOpenCartDropDown() {
        // DEVNOTE: Reload needed to wait for badge render due to an error
        //          while opening empty cart
        await this.page.reload();
        await this.openCartDropDown.click();
        const cartDropDown = new CartDropDown(this.page);
        await cartDropDown.isOpened();
        return cartDropDown;
    }
}
