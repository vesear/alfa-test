import { expect, Locator } from '@playwright/test';
import { APP_URL } from '../config';
import { MainPage } from '../pageObjects/mainPage/mainPage';
import { CartPage } from '../pageObjects/cartPage';
import getRandomElementArray from '../utils/getRandomElementArray';
import { test } from '../fixtures/baseFixture';
import { NoteItem } from '../pageObjects/mainPage/components/noteItem';

const ITEMS_COUNT_TO_BE_IN_CART = '1';

test('Go to empty cart', async ({ page, mainPage }) => {
    const cartPage = new CartPage(page);

    await mainPage.waitForNoteListVisible();

    const allItems = await mainPage.getNoteItems({ hasDiscount: true });
    const itemToBeAddedToCart = getRandomElementArray<Locator>(allItems);
    const noteItemComponent = new NoteItem(page, itemToBeAddedToCart);
    const itemInfo = await noteItemComponent.getInfo();

    await mainPage.addNoteItemToCart(itemToBeAddedToCart);
    await expect(await mainPage.NavBar.getCartBadgeCount()).toHaveText(ITEMS_COUNT_TO_BE_IN_CART);

    const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

    const itemsInCart = await cartDropDown.getCartItems();

    const firstItem = itemsInCart[0];

    const cartItemInfo = await cartDropDown.getItemInfo(firstItem);

    const cartTotalPrice = await cartDropDown.getTotalPrice();

    expect(itemInfo.name).toBe(cartItemInfo.itemTitle);
    expect(itemInfo.actualPrice).toBe(cartItemInfo.itemPrice);
    expect(cartItemInfo.itemCount).toBe(ITEMS_COUNT_TO_BE_IN_CART);
    expect(cartTotalPrice).toBe(itemInfo.actualPrice);

    await cartDropDown.goToCart();

    const currentUrl = page.url();

    expect(currentUrl).toBe(APP_URL + cartPage.url);

    await page.pause();
});


