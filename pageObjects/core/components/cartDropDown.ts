import { Locator, Page } from '@playwright/test';
import extractNumbersFromString from '../../../utils/extractNumbersFromString';

export class CartDropDown {
    private readonly cartDropDown;
    private readonly cartItem;
    private readonly cartItemTitle = "//span[@class='basket-item-title']";
    private readonly cartItemPrice = "//span[@class='basket-item-price']";
    private readonly cartItemCount = '//span[contains(@class,"basket-item-count")]';
    private readonly cartPrice;
    private readonly goToCartBtn;

    constructor(page: Page) {
        this.cartItem = page.locator('//li[contains(@class,"basket-item")]');
        this.cartDropDown = page.locator("//div[@class='dropdown-menu dropdown-menu-right show']");
        this.cartPrice = page.locator('//span[@class="basket_price"]');
        this.goToCartBtn = page.locator('//a[text()="Перейти в корзину"]');
    }

    async isOpened() {
        try {
            await this.cartDropDown.waitFor({ state: 'visible' });
            return true;
        } catch (e) {
            return false;
        }
    }

    async getCartItems() {
        return this.cartItem.all();
    }

    async getTotalPrice() {
        return this.cartPrice.textContent();
    }

    async goToCart() {
        await this.goToCartBtn.click();
    }

    async getItemInfo(cartItemLocator: Locator) {
        const itemPriceStr = await cartItemLocator.locator(this.cartItemPrice).textContent();
        const itemTitle = await cartItemLocator.locator(this.cartItemTitle).textContent();
        const itemCount = await cartItemLocator.locator(this.cartItemCount).textContent();

        const [itemPrice] = extractNumbersFromString(itemPriceStr);

        return {
            itemTitle,
            itemPrice,
            itemCount,
        };
    }
}
