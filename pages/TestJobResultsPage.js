class TestJobResultsPage {
  constructor(page) {
    this.page = page;
    this.locationElements = page.locator('.job-location'); 
  }

  async getAllLocations() {
    await this.locationElements.first().waitFor({ state: 'visible', timeout: 10000 });
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
    console.log('Found locations:', uniqueLocations);

    if (uniqueLocations.length > 1) {
      console.log(`Results are from multiple locations (${uniqueLocations.length})`);
    } else {
      throw new Error(`Only found one location: ${uniqueLocations[0]}`);
    }
  }


  async verifyAllLocationsAreInNetherlands() {
    const locations = await this.getAllLocations();
    console.log('Found locations:', locations);
    const netherlandsPattern = /\b(netherlands?|nederland|nl)\b/i;
    
    const invalid = locations.filter(loc => !netherlandsPattern.test(loc));

    console.log(invalid.length)

    if (invalid.length) {
      throw new Error(`Found non-Netherlands locations: ${invalid.join(', ')}`);
    }
    console.log(`All ${locations.length} results are from the Netherlands`);
  }
}

module.exports = { TestJobResultsPage };
