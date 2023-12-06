import { Locator } from '@playwright/test';
import { test, expect } from '../fixtures/baseFixture';
import { CartPage } from '../pageObjects/cartPage';
import { NoteItem } from '../pageObjects/mainPage/components/noteItem';
import getRandomElementArray from '../utils/getRandomElementArray';
import { APP_URL } from '../config';

const ITEMS_COUNT = '1';

const testData = [
    { testCase: 'TC-2', hasDiscount: false },
    { testCase: 'TC-3', hasDiscount: true },
];

for (const { testCase, hasDiscount } of testData) {
    test(`${testCase}: Go to cart with 1 item, hasDiscount(${hasDiscount}).`, async ({
        page,
        mainPage,
    }) => {
        const cartPage = new CartPage(page);

        await mainPage.waitForNoteListVisible();

        const foundedItems = await mainPage.getAllMatchingNoteItems({
            hasDiscount,
            neededCount: parseInt(ITEMS_COUNT),
        });

        const itemToBeAddedToCart = getRandomElementArray<Locator>(foundedItems);
        const noteItemComponent = new NoteItem(page, itemToBeAddedToCart);
        const itemInfo = await noteItemComponent.getInfo();

        await noteItemComponent.clickBuyButton();
        expect.soft(await mainPage.NavBar.waitForCartBadgeToBeVisible(ITEMS_COUNT)).toBe(true);

        const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

        expect.soft(await cartDropDown.isOpened()).toBe(true);

        const [firstItem] = await cartDropDown.getCartItems();

        const cartItemInfo = await cartDropDown.getItemInfo(firstItem);

        const cartTotalPrice = await cartDropDown.getTotalPrice();

        expect.soft(itemInfo.name).toBe(cartItemInfo.itemTitle);
        expect.soft(itemInfo.actualPrice).toBe(cartItemInfo.itemPrice);
        expect.soft(cartItemInfo.itemCount).toBe(ITEMS_COUNT);
        expect.soft(cartTotalPrice).toBe(itemInfo.actualPrice);

        await cartDropDown.goToCart();

        const currentUrl = page.url();

        expect.soft(currentUrl).toBe(APP_URL + cartPage.url);
    });
}







