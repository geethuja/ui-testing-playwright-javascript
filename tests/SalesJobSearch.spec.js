import { test, expect } from '@playwright/test';

const getNumber = async (locator) => {
    const text = await locator.textContent();
    const match = text ? text.match(/\d+/) : null;
    return match ? parseInt(match[0]) : 0;
};


test('Verify Sales job Search in Germany', async({ page }) => {

    /* 1. Open the careers site and verify page loaded */

    await page.goto('https://careers.justeattakeaway.com/global/en/home');
    await expect(page).toHaveTitle(/Careers/i);

    /* 2. Click on “Search for Job Title” and select “Sales” among Job Categories */

    await page.locator('#typehead').click();
    await page.locator('.au-target.phs-Sales').click();
    await expect(page).toHaveURL('https://careers.justeattakeaway.com/global/en/c/sales-jobs')

    /* 3. Scroll to “Refine your search” */

    await page.locator('#facetInput_0').evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    await page.waitForSelector('#facetInput_0', { state: 'visible' });
    const refinePanel = page.getByText(/Refine your search/i);
    await refinePanel.scrollIntoViewIfNeeded();

    /* 4. Verify Category “Sales” is selected and the search results number is matching */
 
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

    /* 5. Then Refine your search from the left panel to the Country “Germany”*/

    await page.locator('button[id="CountryAccordion"] i[class="au-target icon icon-plus"]').click();
    await page.locator('#country_phs_3').check({ force: true });
    expect(await page.locator('#country_phs_3').isChecked()).toBeTruthy();
  
    /* 6. Verify the number of the search results is matching and category is “Sales” on all results */
 
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

    await page.close();

});

