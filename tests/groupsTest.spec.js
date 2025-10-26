import {test, expect } from '@playwright/test';
import { TestJobResultsPage } from '../pages/testJobResultsPage.js';
let page;

test.describe('suite',() => {
    
test.beforeAll(async () => {
    console.log("Database connection set up")
});

test.beforeEach(async ({browser}) => {
    console.log("Clearing Cookies")
    page= await browser.newPage();
    await page.goto('https://careers.justeattakeaway.com/global/en/home');
    await expect(page).toHaveTitle(/Careers/i);
});


test('Verify Test job Search in Netherlands', async() => {

    await page.waitForSelector('#typehead', { state: 'visible', timeout: 15000 });
    await page.locator('#typehead').fill('Test');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search/);
    const searchButton = page.getByRole('button', { name: 'Search', exact: true });
    await searchButton.waitFor({ state: 'visible', timeout: 15000 });
    const searchPage = new TestJobResultsPage(page);
    await searchPage.verifyMultipleLocations(); 
    await page.waitForTimeout(3000);
    await page.locator('button:has-text("Country")').click(); 
    await page.locator('#country_phs_Netherlands2').waitFor({ state: 'visible' });
    await page.locator('#country_phs_Netherlands2').check();
    await page.waitForTimeout(3000);
    const searchResultsPage = new TestJobResultsPage(page);
    await searchResultsPage.verifyAllLocationsAreInNetherlands();

});

test('Verify Sales job Search in Germany', async() => {
   
    await page.locator('#typehead').click();
    await page.locator('.au-target.phs-Sales').click();
    await expect(page).toHaveURL('https://careers.justeattakeaway.com/global/en/c/sales-jobs')
    await page.locator('#facetInput_0').evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForSelector('#facetInput_0', { state: 'visible' });
    const refinePanel = page.getByText(/Refine your search/i);
    await refinePanel.scrollIntoViewIfNeeded();
    const text = await page.locator('.facet-tag.au-target').textContent();
    if (text.includes('Sales')) {
        console.log('Search results are related "Sales"');
    }
    const expSalesJob = await getNumber(page.locator('.result-count.au-target'));
    const actualJobNum = await getNumber(page.locator('label[for="category_phs_0"] span[role="text"]'));
    console.log(
        expSalesJob === actualJobNum
            ? "The search result numbers are matching"
            : "The search result numbers do not matching"
        );
    await page.locator('button[id="CountryAccordion"] i[class="au-target icon icon-plus"]').click();
    await page.locator('#country_phs_3').check({ force: true });
    expect(await page.locator('#country_phs_3').isChecked()).toBeTruthy();
    await page.waitForTimeout(1000); 
    const expSalesJobDE = await getNumber(page.locator('.result-count.au-target'));
    const actualJobNumDE = await getNumber(page.locator('label[for="category_phs_1"] span[role="text"]'));
    console.log(
    expSalesJobDE === actualJobNumDE
        ? "The search result numbers are matching in Germany"
        : "The search result numbers do not matching in Germany"
    );
    const resultCategories = page.locator('span.job-category.au-target', { hasText: 'Sales' });
    const count = await resultCategories.count();
    for (let i = 0; i < count; i++) {
    await expect(resultCategories.nth(i)).toContainText('Sales');
    }
    console.log(`category is “Sales” on all ${count} results`)

});

test.afterEach(async () => {
   await page.close();
   console.log("cache Removeal")
});

test.afterAll(async () => {
    console.log("Database Connection disconnect")
});

});


test('Test 3', async () => {
    console.log("Test 3 Block")
});

test('Test 4', async () => {
    console.log("Test 4 Block")
})
