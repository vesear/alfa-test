import { Locator, Page } from '@playwright/test';
import extractNumbersFromString from '../../../utils/extractNumbersFromString';

export class NoteItem {
    private readonly page;
    private readonly productType;
    private readonly productName;
    private readonly productPrice;
    private readonly productEnterCount;
    private readonly productCount;
    private readonly buyButton;

    constructor(page: Page, itemContainerLocator: Locator) {
        this.page = page;
        this.productType = itemContainerLocator.locator("//small[@class='product_type']");
        this.productName = itemContainerLocator.locator("//div[contains(@class,'product_name')]");
        this.productPrice = itemContainerLocator.locator(
            "//span[contains(@class, 'product_price')]"
        );
        this.productEnterCount = itemContainerLocator.locator('input[name="product-enter-count"]');
        this.productCount = itemContainerLocator.locator("span[class*='product_count']");
        this.buyButton = itemContainerLocator.locator(
            "//button[contains(@class,'actionBuyProduct')]"
        );
    }

    async getQuantityOnWarehouse() {
        return this.productCount.textContent();
    }

    async enterProductQuantity(number: string) {
        await this.productEnterCount.dblclick();
        await this.productEnterCount.fill(number);
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
        const quantityInWarehouse = await this.getQuantityOnWarehouse();
        const [actualPrice, regularPrice] = extractNumbersFromString(priceStr);
        return {
            type,
            name,
            actualPrice,
            regularPrice,
            quantityInWarehouse,
        };
    }

    async clickBuyButton() {
        await this.buyButton.click();
        // DEVNOTE: Reload needed to wait for badge render due to an error
        //          while opening empty cart
        await this.page.reload();
    }
}
