import type { Page } from "@playwright/test";

import AnimationPage from "./AnimationPage";
import ContactPage from "./ContactPage";
import HomePage from "./HomePage";
import PageLayout from "./PageLayout";

export default class DesignPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new DesignPage(page);
  }

  static async goto(page: Page) {
    await page.goto(DesignPage.path);
    return new DesignPage(page);
  }

  static path = "/design";

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
    return DesignPage.get(this.page);
  }

  readonly pageHeading = this.content.getByRole("heading", {
    level: 2,
    name: "Design",
  });
}
