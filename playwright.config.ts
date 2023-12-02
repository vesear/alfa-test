import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: [['html', { open: 'never' }]],
    use: {
        baseURL: 'https://enotes.pointschool.ru/',
        trace: 'on-first-retry',
        viewport: null,
        headless: false,
        ...devices['Desktop Chromium'],
        launchOptions: {
            args: ['--start-maximized'],
        },
    },
});
