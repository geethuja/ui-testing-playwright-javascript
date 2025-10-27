// pages/TestJobSearchPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { logStep } from '../utils/helpers.js';
import { TestJobResultsPage } from './TestJobResultsPage.js';
import { testData } from '../testdata/testData.js';

export class TestJobSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.typehead = page.locator('#typehead');
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.countryButton = page.locator('button:has-text("Country")');
    this.netherlandsCheckbox = page.locator('#country_phs_Netherlands2');
  }

  async openHomePage() {
    await this.openPage(testData.urls.home, testData.messages.title);
  }

  async searchForTestJobs() {
    logStep(`Search for "${testData.keywords.testJob}" jobs`);
    await this.waitForElement(this.typehead);
    await this.typehead.fill(testData.keywords.testJob);
    await this.page.keyboard.press('Enter');
    await expect(this.page).toHaveURL(/search/);
    await this.waitForText(this.searchButton, 15000);
    await this.takeScreenshot('test-jobs-search-results');
  }

  async verifyMultipleLocations() {
    logStep('Verify results from multiple locations');
    const resultsPage = new TestJobResultsPage(this.page);
    await resultsPage.verifyMultipleLocations();
  }

  async applyCountryFilterNetherlands() {
    logStep(`Apply country filter = ${testData.countries.NL}`);
    await this.page.waitForTimeout(2000);
    await this.safeClick(this.countryButton);
    await this.waitForElement(this.netherlandsCheckbox);
    await this.netherlandsCheckbox.check();
    await this.takeScreenshot('filter-netherlands');
  }

  async verifyAllResultsInNetherlands() {
    logStep(`Verify all results are from ${testData.countries.NL}`);
    const resultsPage = new TestJobResultsPage(this.page);
    await resultsPage.verifyAllLocationsAreInCountry(testData.countries.NL);
    await this.takeScreenshot('final-netherlands-results');
  }
  
}
