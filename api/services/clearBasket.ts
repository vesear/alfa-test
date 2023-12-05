import { Page } from '@playwright/test';
import Routes from '../constants/routes';

interface ClearBasketParams {
    page: Page;
    token: string;
}

export default async function clearBasket({ page, token }: ClearBasketParams) {
    return page.request.post(Routes.BasketClear, {
        headers: {
            'X-Csrf-Token': token,
        },
    });
}
