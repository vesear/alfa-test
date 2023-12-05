import { Locator, Page } from '@playwright/test';
import { test, expect } from '../fixtures/baseFixture';
import { NoteItem } from '../pageObjects/mainPage/components/noteItem';
import { APP_URL } from '../config';

const ITEMS_COUNT = '9';

test('TC-5: Go to cart with 9 promotional items of the same title.', async ({
    page,
    mainPage,
    cartPage,
}) => {
    await mainPage.waitForNoteListVisible();

    const itemsLocatorArray = await mainPage.getNoteItems({ hasDiscount: true });

    const { neededNoteItem, neededNoteItemInfo } = await findItemWithSufficientQuantity(
        page,
        itemsLocatorArray,
        parseInt(ITEMS_COUNT)
    );

    await neededNoteItem.enterProductQuantity(ITEMS_COUNT);
    await neededNoteItem.clickBuyButton();
    await page.reload();

    await expect(await mainPage.NavBar.getCartBadgeCount()).toHaveText(ITEMS_COUNT);

    const cartDropDown = await mainPage.NavBar.clickOpenCartDropDown();

    expect(await cartDropDown.isOpened()).toBe(true);

    const [firstItem] = await cartDropDown.getCartItems();
    const cartItemInfo = await cartDropDown.getItemInfo(firstItem);
    const cartTotalPrice = await cartDropDown.getTotalPrice();

    expect(neededNoteItemInfo.name).toBe(cartItemInfo.itemTitle);
    expect(calculatePrice(neededNoteItemInfo.actualPrice, ITEMS_COUNT)).toBe(
        cartItemInfo.itemPrice
    );
    expect(cartItemInfo.itemCount).toBe(ITEMS_COUNT);
    expect(cartTotalPrice).toBe(calculatePrice(neededNoteItemInfo.actualPrice, ITEMS_COUNT));

    await cartDropDown.goToCart();

    const currentUrl = page.url();
    expect(currentUrl).toBe(APP_URL + cartPage.url);
});

function calculatePrice(itemPrice: string, count: string) {
    return (parseInt(itemPrice) * parseInt(count)).toString();
}

async function findItemWithSufficientQuantity(
    page: Page,
    itemsLocatorArray: Locator[],
    minQuantity: number
) {
    let neededNoteItem = null;
    let neededNoteItemInfo = null;

    for (let itemLocator of itemsLocatorArray) {
        const noteItem = new NoteItem(page, itemLocator);
        const itemInfo = await noteItem.getInfo();

        if (parseInt(itemInfo.quantityInWarehouse) >= minQuantity) {
            neededNoteItem = noteItem;
            neededNoteItemInfo = itemInfo;
        }
    }

    if (!neededNoteItem) {
        throw new Error(
            `No items with the required quantity (${minQuantity}) are available. Please review your test logic and ensure that items with the specified quantity are present.`
        );
    }

    return {
        neededNoteItem,
        neededNoteItemInfo,
    };
}


