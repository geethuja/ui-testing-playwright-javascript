// pages/BasePage.js
import { expect } from '@playwright/test';
import { waitForText, captureScreenshot, logStep } from '../utils/helpers.js';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openPage(url, expectedTitle) {
    logStep(`Navigate to ${url}`);
    await this.page.goto(url);
    if (expectedTitle) {
      await expect(this.page).toHaveTitle(expectedTitle);
    }
    await captureScreenshot(this.page, 'page-loaded');
  }

  async safeClick(locator, timeout = 20000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async waitForElement(locator, timeout = 20000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForText(locator, timeout = 10000) {
    await waitForText(locator, timeout);
  }

  async takeScreenshot(name) {
    await captureScreenshot(this.page, name);
  }
}
