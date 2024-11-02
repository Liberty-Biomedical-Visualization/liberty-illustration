import type { Page } from "@playwright/test";

import PageLayout from "./PageLayout";

export default class HomePage extends PageLayout {
  static async goto(page: Page) {
    await page.goto("/");
    return new HomePage(page);
  }

  clickNextImageButton() {
    return this.nextImageButton.click();
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
