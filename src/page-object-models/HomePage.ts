import type { Locator, Page } from "@playwright/test";

import PageLayout from "./PageLayout";

export default class HomePage extends PageLayout {
  static async goto(page: Page) {
    await page.goto("/");
    return new HomePage(page);
  }

  private constructor(page: Page) {
    super(page);
    this.firstImage = this.content.getByRole("img").first();
    this.nextImageButton = this.content.getByRole("button", {
      name: "Next image",
    });
    this.previousImageButton = this.content.getByRole("button", {
      name: "Previous image",
    });
    this.secondImage = this.content.getByRole("img").nth(1);
  }

  clickNextImageButton() {
    return this.nextImageButton.click();
  }

  clickPreviousImageButton() {
    return this.previousImageButton.click();
  }

  readonly firstImage: Locator;
  readonly nextImageButton: Locator;
  readonly previousImageButton: Locator;
  readonly secondImage: Locator;

  private content = this.page.getByRole("main");
}
