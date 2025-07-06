import type { Page } from "@playwright/test";

import ContactPage from "./ContactPage";
import DesignPage from "./DesignPage";
import HomePage from "./HomePage";
import PageLayout from "./PageLayout";

export default class AnimationPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new AnimationPage(page);
  }

  static async goto(page: Page) {
    await page.goto(AnimationPage.path);
    return new AnimationPage(page);
  }

  static path = "/animation";

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

  async clickMedicalIllustrationLink() {
    await this.medicalIllustration.click();
    return AnimationPage.get(this.page);
  }

  readonly pageHeading = this.content.getByRole("heading", {
    level: 2,
    name: "Animation",
  });
}
