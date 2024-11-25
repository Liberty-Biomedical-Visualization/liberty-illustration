import type { Page } from "@playwright/test";

import HomePage from "./HomePage";
import PageLayout from "./PageLayout";

export default class PortfolioPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new PortfolioPage(page);
  }

  static async goto(page: Page) {
    await page.goto("/portfolio");
    return new PortfolioPage(page);
  }

  static path = "/portfolio";

  async clickHomeLink() {
    await this.homeLink.click();
    return HomePage.get(this.page);
  }

  async clickPortfolioLink() {
    await this.portfolioLink.click();
    return PortfolioPage.get(this.page);
  }
}
