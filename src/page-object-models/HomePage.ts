import type { Page } from "@playwright/test";

import AnimationPage from "./AnimationPage";
import ContactPage from "./ContactPage";
import DesignPage from "./DesignPage";
import MedicalIllustrationPage from "./MedicalIllustrationPage";
import PageLayout from "./PageLayout";

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

  async clickAnimationLink() {
    await this.animationLink.click();
    return AnimationPage.get(this.page);
  }

  async clickContactLink() {
    await this.contactLink.click();
    return ContactPage.get(this.page);
  }

  async clickDesignLink() {
    await this.designLink.click();
    return DesignPage.get(this.page);
  }

  async clickHomeLink() {
    await this.homeLink.click();
    return HomePage.get(this.page);
  }

  clickNextImageButton() {
    return this.nextImageButton.click();
  }

  async clickMedicalIllustrationLink() {
    await this.medicalIllustration.click();
    return MedicalIllustrationPage.get(this.page);
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
