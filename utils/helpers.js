
export const getNumber = async (locator) => {
  const text = await locator.textContent();
  const match = text ? text.match(/\d+/) : null;
  return match ? parseInt(match[0]) : 0;
};


export const waitForText = async (locator, timeout = 10000) => {
  await locator.waitFor({ state: 'visible', timeout });
  const text = await locator.textContent();
  if (!text || !text.trim()) {
    throw new Error(`Locator ${locator} has no text after ${timeout}ms`);
  }
  return text.trim();
};


export const logStep = (message) => {
  console.log(`[STEP] ${message}`);
};


export const captureScreenshot = async (page, name = 'screenshot') => {
  await page.screenshot({ path: `screenshots/${name}_${Date.now()}.png`, fullPage: true });
  console.log(`Screenshot saved: ${name}`);
};
