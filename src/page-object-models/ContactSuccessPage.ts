import type { Page } from "@playwright/test";

import HomePage from "./HomePage";
import PageLayout from "./PageLayout";
import PortfilioPage from "./PortfolioPage";

export default class ContactSuccessPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new ContactSuccessPage(page);
  }

  static async goto(page: Page) {
    await page.goto(this.path);
    return new ContactSuccessPage(page);
  }

  static path = "/contact/success";

  async clickHomeLink() {
    await this.homeLink.click();
    return HomePage.get(this.page);
  }

  async clickPortfolioLink() {
    await this.portfolioLink.click();
    return PortfilioPage.get(this.page);
  }

  readonly successHeading = this.page.getByRole("heading", {
    level: 2,
    name: "Message submitted successfully",
  });
}
