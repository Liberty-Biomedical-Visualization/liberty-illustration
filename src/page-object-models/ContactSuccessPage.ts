import type { Page } from "@playwright/test";

import AnimationPage from "./AnimationPage";
import ContactPage from "./ContactPage";
import DesignPage from "./DesignPage";
import HomePage from "./HomePage";
import MedicalIllustrationPage from "./MedicalIllustrationPage";
import PageLayout from "./PageLayout";

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
    return MedicalIllustrationPage.get(this.page);
  }

  readonly successHeading = this.content.getByRole("heading", {
    level: 2,
    name: "Message submitted successfully",
  });
}
