import type { Page } from "@playwright/test";

import ContactPage from "./ContactPage";
import HomePage from "./HomePage";
import PageLayout from "./PageLayout";

export default class MedicalIllustrationPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new MedicalIllustrationPage(page);
  }

  static async goto(page: Page) {
    await page.goto(MedicalIllustrationPage.path);
    return new MedicalIllustrationPage(page);
  }

  static path = "/medical-illustration";

  async clickContactLink() {
    await this.contactLink.click();
    return ContactPage.get(this.page);
  }

  async clickHomeLink() {
    await this.homeLink.click();
    return HomePage.get(this.page);
  }

  async clickMedicalIllustrationLink() {
    await this.medicalIllustration.click();
    return MedicalIllustrationPage.get(this.page);
  }

  readonly pageHeading = this.content.getByRole("heading", {
    level: 2,
    name: "Medical Illustration",
  });
}
