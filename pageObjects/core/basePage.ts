import { NavBar } from './components/navBar';
import { Page } from '@playwright/test';

export abstract class BasePage {
    public readonly NavBar;
    protected readonly page: Page;

    protected constructor(readonly _page: Page) {
        this.page = _page;
        this.NavBar = new NavBar(_page);
    }
}
