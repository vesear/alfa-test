import { NavBar } from './components/navBar';
import { Page } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly NavBar;

    protected constructor(readonly _page: Page) {
        this.page = _page;
        this.NavBar = new NavBar(_page);
    }
}
