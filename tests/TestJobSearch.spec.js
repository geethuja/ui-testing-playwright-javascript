import { test, expect } from '@playwright/test';
import { TestJobResultsPage } from '../pages/testJobResultsPage.js';
import { logStep, waitForText, captureScreenshot } from '../utils/helpers.js';
import { testData } from '../utils/testData.js';

test('Verify Test job Search in Netherlands @sanity', async({ page }) => {

    /* 1. Open the careers site and verify page loaded */
    logStep('Open careers homepage');
    await page.goto(testData.urls.home);
    await expect(page).toHaveTitle(testData.messages.title);

    /* 2. Perform job search for “Test” */
    logStep(`Perform job search for ${testData.keywords.testJob}`);
    await page.waitForSelector('#typehead', { state: 'visible', timeout: 15000 });
    await page.locator('#typehead').fill(testData.keywords.testJob);
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/search/);
    await waitForText(page.getByRole('button', { name: 'Search', exact: true }), 15000);
    await captureScreenshot(page, 'search-results-loaded');

    /* 3. Ensure results appear across multiple locations */
    logStep('Verify results appear across multiple locations')
    const searchPage = new TestJobResultsPage(page);
    await searchPage.verifyMultipleLocations(); 

    /* 4. Apply country filter = “Netherlands” */
    logStep(`Apply country filter = "${testData.countries.NL}"`);
    await page.waitForTimeout(3000);
    await page.locator('button:has-text("Country")').click(); 
    await page.locator('#country_phs_Netherlands2').waitFor({ state: 'visible' });
    await page.locator('#country_phs_Netherlands2').check();

    /* 5. Validate all results belong to Netherlands only*/
    logStep(`Validate all results belong to ${testData.countries.NL}`);
    await page.waitForTimeout(3000);
    const searchResultsPage = new TestJobResultsPage(page);
    await searchResultsPage.verifyAllLocationsAreInCountry(testData.countries.NL);
    await captureScreenshot(page, 'final-results');

    await page.close();

});

