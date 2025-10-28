import { test } from '@playwright/test';
import { TestJobSearchPage } from '../pages/TestJobSearchPage.js';

test('Verify Test job Search in Netherlands @sanity', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Skipping due to known WebKit issue');


  const testJobPage = new TestJobSearchPage(page);

  await testJobPage.openHomePage();
  await testJobPage.searchForTestJobs();
  await testJobPage.verifyMultipleLocations();
  await testJobPage.applyCountryFilterNetherlands();
  await testJobPage.verifyAllResultsInNetherlands();

  await page.close();
});
