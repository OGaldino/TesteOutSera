import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'UI - Chromium (SauceDemo)', 
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        headless: true,
        baseURL: 'https://www.saucedemo.com', 
      },
    },
    {
      name: 'API Tests', 
      use: {
        baseURL: 'https://reqres.in/api', 
        extraHTTPHeaders: {
          'x-api-key': 'reqres-free-v1',
          'accept': 'application/json',
          'cache-control': 'no-cache'
        },
      },
    },
  ],
});