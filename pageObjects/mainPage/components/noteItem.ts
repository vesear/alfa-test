import { Locator, Page } from '@playwright/test';
import extractNumbersFromString from '../../../utils/extractNumbersFromString';

export class NoteItem {
    private readonly productType: Locator;
    private readonly productName: Locator;
    private readonly productPrice: Locator;

    constructor(page: Page, itemContainerLocator: Locator) {
        this.productType = itemContainerLocator.locator("//small[@class='product_type']");
        this.productName = itemContainerLocator.locator("//div[contains(@class,'product_name')]");
        this.productPrice = itemContainerLocator.locator(
            "//span[contains(@class, 'product_price')]"
        );
    }

    async getProductType() {
        return this.productType.textContent();
    }

    async getProductName() {
        return this.productName.textContent();
    }

    async getProductPrice() {
        return this.productPrice.textContent();
    }

    async getInfo() {
        const type = await this.getProductType();
        const name = await this.getProductName();
        const priceStr = await this.getProductPrice();
        const [actualPrice, regularPrice] = extractNumbersFromString(priceStr);
        return {
            type,
            name,
            actualPrice,
            regularPrice,
        };
    }
}
