import { test } from '@playwright/test';
import { SalesJobSearchPage } from '../pages/SalesJobSearchPage.js';

test('Verify Sales job Search in Germany @regression', async ({ page }) => {
  const salesPage = new SalesJobSearchPage(page);

  await salesPage.openHomePage();
  await salesPage.selectSalesCategory();
  await salesPage.scrollToRefinePanel();
  await salesPage.verifyCategorySelected();
  await salesPage.refineByGermany();
  await salesPage.verifyResultsInGermany();

  await page.close();
});
