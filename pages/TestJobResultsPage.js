export class TestJobResultsPage {
  constructor(page) {
    this.page = page;
    this.locationElements = page.locator('.job-location');
  }

  async getAllLocations() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('.job-location', { state: 'attached', timeout: 20000 });
    const firstLoc = this.locationElements.first();
    await firstLoc.scrollIntoViewIfNeeded();
    await firstLoc.waitFor({ state: 'visible', timeout: 20000 });
    await this.page.screenshot({ path: 'debug-job-locations.png', fullPage: true });

    const count = await this.locationElements.count();
    const locations = [];

    for (let i = 0; i < count; i++) {
      const rawText = await this.locationElements.nth(i).innerText();
      const locationText = rawText.trim().toLowerCase();
      locations.push(locationText);
    }

    return locations;
  }

  async verifyMultipleLocations() {
    const locations = await this.getAllLocations();
    const uniqueLocations = [...new Set(locations)];

    if (uniqueLocations.length > 1) {
      console.log(`Results are from multiple locations (${uniqueLocations.length})`);
    } else {
      throw new Error(`Only found one location: ${uniqueLocations[0]}`);
    }
  }
/*
  async verifyAllLocationsAreInNetherlands() {
    const locations = await this.getAllLocations();
    const netherlandsPattern = /\b(netherlands?|nederland|nl)\b/i;
    const invalid = locations.filter(loc => !netherlandsPattern.test(loc));

    if (invalid.length) {
      throw new Error(`Found non-Netherlands locations: ${invalid.join(', ')}`);
    }
    console.log(`All ${locations.length} results are from the Netherlands`);
  }
*/

  async verifyAllLocationsAreInCountry(country) {
      const locations = await this.getAllLocations();
      const pattern = new RegExp(`\\b(${country}|${country.toLowerCase()}|${country.slice(0,2)})\\b`, 'i');
      const invalid = locations.filter(loc => !pattern.test(loc));

      if (invalid.length) {
        throw new Error(`Found non-${country} locations: ${invalid.join(', ')}`);
      }
      console.log(`All ${locations.length} results are from ${country}`);
  }
}


