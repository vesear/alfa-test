import { Page } from '@playwright/test';
import { CartDropDown } from './cartDropDown';

export class NavBar {
    private readonly page;
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
        await this.openCartDropDown.click();
        return new CartDropDown(this.page);
    }
}
