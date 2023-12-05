import extractCsrfTokenFromHtml from './services/extractCsrfTokenFromHtml';
import { Page } from '@playwright/test';
import Routes from './constants/routes';

export default async function useApiAuthorize(page: Page) {
    const getLoginResponse = await page.request.get(Routes.Login);

    const getLoginResponseBody = await getLoginResponse.text();
    const csrfToken = extractCsrfTokenFromHtml(getLoginResponseBody);

    await page.request.post(Routes.Login, {
        form: {
            _csrf: csrfToken,
            'LoginForm[username]': 'test',
            'LoginForm[password]': 'test',
        },
    });

    const getMainPageResponse = await page.request.get('');

    const getMainPageResponseBody = await getMainPageResponse.text();
    const newCsrfToken = extractCsrfTokenFromHtml(getMainPageResponseBody);
    return newCsrfToken ?? '';
}
