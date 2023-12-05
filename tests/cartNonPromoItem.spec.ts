import { Locator } from '@playwright/test';
import { test, expect } from '../fixtures/baseFixture';
import { CartPage } from '../pageObjects/cartPage';
import { NoteItem } from '../pageObjects/mainPage/components/noteItem';
import getRandomElementArray from '../utils/getRandomElementArray';
import { APP_URL } from '../config';

const ITEMS_COUNT = '1';

test('TC-2: Go to cart with 1 non-promo item.', async ({ page, mainPage }) => {
    const cartPage = new CartPage(page);

    await mainPage.waitForNoteListVisible();

    const allItems = await mainPage.getNoteItems({ hasDiscount: false });
    const itemToBeAddedToCart = getRandomElementArray<Locator>(allItems);
    const noteItemComponent = new NoteItem(itemToBeAddedToCart);
    const itemInfo = await noteItemComponent.getInfo();

    await noteItemComponent.clickBuyButton();
    await expect(await mainPage.NavBar.getCartBadgeCount()).toHaveText(ITEMS_COUNT);

    const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

    const itemsInCart = await cartDropDown.getCartItems();

    const firstItem = itemsInCart[0];

    const cartItemInfo = await cartDropDown.getItemInfo(firstItem);

    const cartTotalPrice = await cartDropDown.getTotalPrice();

    expect(itemInfo.name).toBe(cartItemInfo.itemTitle);
    expect(itemInfo.actualPrice).toBe(cartItemInfo.itemPrice);
    expect(cartItemInfo.itemCount).toBe(ITEMS_COUNT);
    expect(cartTotalPrice).toBe(itemInfo.actualPrice);

    await cartDropDown.goToCart();

    const currentUrl = page.url();

    expect(currentUrl).toBe(APP_URL + cartPage.url);
});



