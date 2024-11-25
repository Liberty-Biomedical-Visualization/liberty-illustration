import type { Page } from "@playwright/test";

import PageLayout from "./PageLayout";
import PortfolioPage from "./PortfolioPage";

export default class HomePage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new HomePage(page);
  }

  static async goto(page: Page) {
    await page.goto(this.path);
    return new HomePage(page);
  }

  static path = "/";

  async clickHomeLink() {
    await this.homeLink.click();
    return HomePage.get(this.page);
  }

  clickNextImageButton() {
    return this.nextImageButton.click();
  }

  async clickPortfolioLink() {
    await this.portfolioLink.click();
    return PortfolioPage.get(this.page);
  }

  clickPreviousImageButton() {
    return this.previousImageButton.click();
  }

  readonly firstImage = this.content.getByRole("img").first();
  readonly nextImageButton = this.content.getByRole("button", {
    name: "Next image",
  });
  readonly previousImageButton = this.content.getByRole("button", {
    name: "Previous image",
  });
  readonly secondImage = this.content.getByRole("img").nth(1);
}
