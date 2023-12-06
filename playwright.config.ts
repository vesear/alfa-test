import { defineConfig, devices } from '@playwright/test';
import { APP_URL } from './config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: [['html', { open: 'never' }], ['allure-playwright']],
    use: {
        baseURL: APP_URL,
        trace: 'on-first-retry',
        viewport: null,
        headless: false,
        ...devices['Desktop Chromium'],
        launchOptions: {
            args: ['--start-maximized'],
        },
        screenshot: 'only-on-failure',
    },
});
