import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';

export class MainPage extends BasePage {
    private readonly noteListRow;
    private readonly pageLink;

    constructor(public readonly page: Page) {
        super(page);
        this.noteListRow = page.locator('//div[@class="note-list row"]');
        this.pageLink = page.locator('.page-link');
    }

    async waitForNoteListVisible() {
        await this.noteListRow.waitFor({ state: 'visible' });
    }

    async getNoteItems({ hasDiscount }: { hasDiscount: boolean }) {
        return (await this.getNoteItem({ hasDiscount })).all();
    }

    async getAllMatchingNoteItems({
        hasDiscount,
        neededCount = 1,
    }: {
        hasDiscount: boolean;
        neededCount: number;
    }) {
        const allItems = await this.getNoteItems({ hasDiscount });

        if (allItems.length >= neededCount) {
            return allItems;
        }

        let foundedItems: Locator[] = [];

        const allPages = await this.pageLink.all();
        if (allPages.length === 1) {
            throw new Error('THere are no items with requested params');
        }

        allPages.shift();

        for (const pageLocator of allPages) {
            await pageLocator.click();
            const pageItems = await this.getNoteItems({ hasDiscount });
            foundedItems = [...foundedItems, ...pageItems];
            if (pageItems.length >= neededCount) {
                break;
            }
        }
        if (foundedItems.length === 0) {
            throw new Error('Here is no matches items......');
        }

        return foundedItems;
    }

    private async getNoteItem({ hasDiscount }: { hasDiscount: boolean }) {
        const postfix = hasDiscount ? " and contains(@class,'hasDiscount')" : '';
        const selector = `//div[contains(@class, 'note-item')${postfix}]`;
        return this.page.locator(selector);
    }
}
