import { test, expect } from '@playwright/test';
const { TestJobResultsPage } = require('../pages/TestJobResultsPage');

test('Verify Test job Search in Netherlands', async({ page }) => {
    /* 1. Open the careers site and verify page loaded */

    await page.goto('https://careers.justeattakeaway.com/global/en/home');

    /* 2. Perform job search for “Test” */

    await page.locator('#typehead').fill('Test');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search/);
    await page.getByRole('button', { name: 'Search', exact: true }).click();


    /* 3. Ensure results appear across multiple locations */

      const searchPage = new TestJobResultsPage(page);
      await searchPage.verifyMultipleLocations(); 

    /* 4. Apply country filter = “Netherlands” */
    await page.getByRole('button', { name: 'Country' }).click();
    await page.waitForSelector('#country_phs_Netherlands2');
    await page.locator('#country_phs_Netherlands2').check({ timeout: 10000 });


    /* 5. Validate all results belong to Netherlands only*/

    const searchResultsPage = new TestJobResultsPage(page);
    await searchResultsPage.verifyAllLocationsAreInNetherlands();

    await page.close();

});

