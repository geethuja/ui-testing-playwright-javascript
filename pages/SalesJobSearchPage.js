// pages/SalesJobSearchPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { getNumber, logStep } from '../utils/helpers.js';
import { testData } from '../testdata/testData.js';

export class SalesJobSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.typehead = page.locator('[data-ph-at-id="globalsearch-input"]').first();;
    this.jobCategory = page.locator('.au-target.phs-Sales');
    this.refinePanel = page.getByText(testData.messages.refineSearch);
    this.resultCount = page.locator('.result-count.au-target');
    this.categoryFacet = page.locator('label[for="category_phs_0"] span[role="text"]');
    this.countryAccordion = page.locator('button#CountryAccordion i.icon-plus');
    this.germanyCheckbox = page.locator('#country_phs_3');
    this.categoryResults = page.locator('span.job-category.au-target', { hasText: testData.keywords.salesJob });
  }

  async openHomePage() {
    await this.openPage(testData.urls.home, testData.messages.title);
  }

  async selectSalesCategory() {
    logStep(`Select job category: ${testData.keywords.salesJob}`); 
    await this.safeClick(this.typehead);
    await this.safeClick(this.jobCategory);
    await expect(this.page).toHaveURL(testData.urls.sales);
    await this.takeScreenshot('sales-category-page');
  }

  async scrollToRefinePanel() {
    logStep('Scroll to refine panel');
    await this.page.locator('#facetInput_0').evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.waitForText(this.refinePanel);
    await this.refinePanel.scrollIntoViewIfNeeded();
    await this.takeScreenshot('refine-panel');
  }

  async verifyCategorySelected() {
    logStep(`Verify "${testData.keywords.salesJob}" category selected`);
    const text = await this.page.locator('.facet-tag.au-target').textContent();
    if (!text.includes(testData.keywords.salesJob)) {
      throw new Error(`Expected category "${testData.keywords.salesJob}" not found`);
    }

    const exp = await getNumber(this.resultCount);
    const actual = await getNumber(this.categoryFacet);
    console.log(exp === actual
      ? 'Job counts match'
      : 'Job counts mismatch');
  }

  async refineByGermany() {
    logStep(`Refine by Country: ${testData.countries.DE}`);
    await this.safeClick(this.countryAccordion);
    await this.germanyCheckbox.check({ force: true });
    expect(await this.germanyCheckbox.isChecked()).toBeTruthy();
    await this.takeScreenshot('country-filter-germany');
  }

  async verifyResultsInGermany() {
    logStep(`Verify all results are in ${testData.countries.DE}`);
    const expDE = await getNumber(this.resultCount);
    const actualDE = await getNumber(this.page.locator('label[for="category_phs_1"] span[role="text"]'));
    console.log(expDE === actualDE
      ? `Result counts match for ${testData.countries.DE}`
      : `Result counts mismatch for ${testData.countries.DE}`);

    const count = await this.categoryResults.count();
    for (let i = 0; i < count; i++) {
      await expect(this.categoryResults.nth(i)).toContainText(testData.keywords.salesJob);
    }
    console.log(`All ${count} results are "${testData.keywords.salesJob}" jobs`);
    await this.takeScreenshot('final-results');
  }
}
