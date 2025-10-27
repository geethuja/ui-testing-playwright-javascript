import { test, expect } from '@playwright/test';
import { testData } from '../testdata/testData.js';

test.describe('Verify JET Careers Home page and SalesJobsearch page @smoke', () => {

  test('Verify JET Careers Home page', async ({ page }) => {
    await page.goto(testData.urls.home);
    await expect(page).toHaveTitle(testData.messages.title);
  });

  test('Verify JET Sales Job search page', async ({ page }) => {
    await page.goto(testData.urls.sales);
  });

});
