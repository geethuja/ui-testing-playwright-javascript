# ui-testing-playwright-javascript
UI tests Playwright JavaScript Automation Framework

A modular and scalable **end-to-end UI automation framework** built with using **JavaScript**.

This framework supports **cross-browser testing**, **Page Object Model (POM)** design, **test tagging** (smoke, sanity, regression), and **HTML reports**.

## Features

* Cross-browser testing — Chromium, Firefox, WebKit (Safari)\
* Page Object Model (POM) design pattern\
* Support for **smoke**, **sanity**, and **regression** test groups\
* Auto screenshots, trace logs, and video on failure\
* Rich HTML reports\
* Configurable base URLs, environments, and retries
* CI-CD (Jenkins)

## Project Structure

Pages/ \
    - BasePage.js\
    - SalesJobSearchPage.js\
    - TestJobSearchPage.js\
    - TestJobResultsPage.js\
tests/
    - salesJobSearchTest.spec.js\
    - testJobSearchTest.spec.js\
    - smokeTest.spec.js\
testdata/\
    - testData.json\
utils/
    - helpers.js\
playwright-reports/
    - index.html\
screenshots

<img width="251" height="589" alt="image" src="https://github.com/user-attachments/assets/7df87898-6cc9-4cf4-9db6-7282926367d4" />


## Installation & Setup

### 1. Clone the repository
https://github.com/geethuja/ui-testing-playwright-javascript.git

Install dependencies
npm install

Install Playwright browsers
npx playwright install

### 2. Running Tests

Run all tests  
npx playwright test

Run specific test file
npx playwright test salesJobSearchTest.spec.js 

Run tests by tag
npx playwright test --grep smoke\
npx playwright test --grep sanity\
npx playwright test --grep regression\

Run in a specific browser

Please specify browsers (chromium, firefox, webkit) like below 

Run tests/salesJobSearchTest.spec.js file :
npx playwright test tests/salesJobSearchTest.spec.js --project=firefox\
npx playwright test tests/salesJobSearchTest.spec.js --project=chromium\
npx playwright test tests/salesJobSearchTest.spec.js --project=webkit\

Run tests/testJobSearchTest.spec.js file:
npx playwright test tests/testJobSearchTest.spec.js --project=chromium\
npx playwright test tests/testJobSearchTest.spec.js --project=firefox\
npx playwright test tests/testJobSearchTest.spec.js --project=webkit\ 

### 3. View Reports

After running tests, open the HTML report:
npx playwright show-report

This opens an interactive dashboard at:
playwright-report/index.html

View test execution screenshorts at:
screenshots
