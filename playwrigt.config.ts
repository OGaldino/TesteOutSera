import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],                     // Saída de linha
    ['html', { open: 'never' }],  // Relatório HTML nativo
    ['allure-playwright'],     // (Opcional) Ative se usar Allure
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://reqres.in/api',
    extraHTTPHeaders: {
      Accept: 'application/json'
    },
    ignoreHTTPSErrors: true
  }
});