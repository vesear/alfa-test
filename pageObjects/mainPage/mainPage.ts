import { Page } from '@playwright/test';
import { BasePage } from '../core/basePage';

export class MainPage extends BasePage {
    private readonly noteListRow;

    constructor(public readonly page: Page) {
        super(page);
        this.noteListRow = page.locator('//div[@class="note-list row"]');
    }

    async waitForNoteListVisible() {
        await this.noteListRow.waitFor({ state: 'visible' });
    }

    async getNoteItems({ hasDiscount }: { hasDiscount: boolean }) {
        return (await this.getNoteItem({ hasDiscount })).all();
    }

    private async getNoteItem({ hasDiscount }: { hasDiscount: boolean }) {
        const postfix = hasDiscount ? " and contains(@class,'hasDiscount')" : '';
        const selector = `//div[contains(@class, 'note-item')${postfix}]`;
        return this.page.locator(selector);
    }
}
