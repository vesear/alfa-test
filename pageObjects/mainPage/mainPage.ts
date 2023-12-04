import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';

export class MainPage extends BasePage {
    private readonly navBarLocator: Locator;
    private readonly cartButtonLocator: Locator;
    private readonly goToCartButtonLocator: Locator;
    private readonly cartDropDownLocator: Locator;
    private readonly noteListRow: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.navBarLocator = page.locator('#navbarNav');
        this.cartButtonLocator = page.locator('#dropdownBasket');
        this.goToCartButtonLocator = page.locator('//a[text()="Перейти в корзину"]');
        this.cartDropDownLocator = page.locator(
            '//div[contains(@class,"dropdown-menu-right show")]'
        );
        this.noteListRow = page.locator('//div[@class="note-list row"]');
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

    async waitForNoteListVisible() {
        await this.noteListRow.waitFor({ state: 'visible' });
    }

    async getNoteItems({ hasDiscount }: { hasDiscount: boolean }) {
        return (await this.getNoteItem({ hasDiscount })).all();
    }

    async addNoteItemToCart(itemLocator: Locator) {
        await itemLocator.locator("//button[contains(@class,'actionBuyProduct')]").click();
    }

    private async getNoteItem({ hasDiscount }: { hasDiscount: boolean }) {
        const postfix = hasDiscount ? " and contains(@class,'hasDiscount')" : '';
        const selector = `//div[contains(@class, 'note-item')${postfix}]`;
        return this.page.locator(selector);
    }
}
