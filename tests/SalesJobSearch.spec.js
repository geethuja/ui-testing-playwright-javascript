import { test, expect } from '@playwright/test';
import { getNumber, logStep, waitForText, captureScreenshot } from '../utils/helpers.js';
import { testData } from '../utils/testData.js';

test('Verify Sales job Search in Germany @regression', async({ page }) => {

    /* 1. Open the careers site and verify page loaded */
    logStep('Open careers homepage');
    await page.goto(testData.urls.home);
    await expect(page).toHaveTitle(testData.messages.title);

    /* 2. Click on “Search for Job Title” and select “Sales” among Job Categories */
    logStep(`Select "${testData.keywords.salesJob}" job category`);
    await page.locator('#typehead').click();
    await page.locator('.au-target.phs-Sales').click();
    await expect(page).toHaveURL(testData.urls.sales)

    /* 3. Scroll to “Refine your search” */
    logStep('Scroll to refine panel');
    await page.locator('#facetInput_0').evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await waitForText(page.getByText(testData.messages.refineSearch));

    await page.waitForSelector('#facetInput_0', { state: 'visible' });
    const refinePanel = page.getByText(/Refine your search/i);
    await refinePanel.scrollIntoViewIfNeeded();

    /* 4. Verify Category “Sales” is selected and the search results number is matching */
   
    logStep(`Verify "${testData.keywords.salesJob}" category selected`);
    const text = await page.locator('.facet-tag.au-target').textContent();
    if (text.includes('testData.keywords.salesJob')) {
        console.log('Search results are related "${testData.keywords.salesJob}"');
    }

    const expSalesJob = await getNumber(page.locator('.result-count.au-target'));
    const actualJobNum = await getNumber(page.locator('label[for="category_phs_0"] span[role="text"]'));

    console.log(
    expSalesJob === actualJobNum
        ? "The search result numbers are matching"
        : "The search result numbers do not matching"
    );

    /* 5. Then Refine your search from the left panel to the Country “Germany”*/
    logStep(`Refine by Country: ${testData.countries.DE}`);
    await page.locator('button[id="CountryAccordion"] i[class="au-target icon icon-plus"]').click();
    await page.locator('#country_phs_3').check({ force: true });
    expect(await page.locator('#country_phs_3').isChecked()).toBeTruthy();
  
    /* 6. Verify the number of the search results is matching and category is “Sales” on all results */
    
    logStep(`Verify ${testData.countries.DE} result count matches`);
    await page.waitForTimeout(1000); 
    const expSalesJobDE = await getNumber(page.locator('.result-count.au-target'));
    const actualJobNumDE = await getNumber(page.locator('label[for="category_phs_1"] span[role="text"]'));

    console.log(
    expSalesJobDE === actualJobNumDE
        ? "The search result numbers are matching in Germany"
        : "The search result numbers do not matching in Germany"
    );

    const resultCategories = page.locator('span.job-category.au-target', { hasText: testData.keywords.salesJob });
    const count = await resultCategories.count();

    for (let i = 0; i < count; i++) {
    await expect(resultCategories.nth(i)).toContainText(testData.keywords.salesJob);
    }

    console.log(`Category is ${testData.keywords.salesJob} on all ${count} results`)
    await captureScreenshot(page, 'sales-job-search-germany');
    await page.close();

});

