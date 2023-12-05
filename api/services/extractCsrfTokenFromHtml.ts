import { JSDOM } from 'jsdom';

const CSRF_TOKEN_SELECTOR = 'meta[name="csrf-token"]';

export default function extractCsrfTokenFromHtml(html: string) {
    const dom = new JSDOM(html);
    // @ts-ignore
    return dom.window.document.querySelector(CSRF_TOKEN_SELECTOR).getAttribute('content');
}
