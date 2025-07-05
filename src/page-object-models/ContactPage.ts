import type { Page } from "@playwright/test";

import HomePage from "./HomePage";
import PageLayout from "./PageLayout";
import MedicalIllustrationPage from "./MedicalIllustrationPage";

export default class ContactPage extends PageLayout {
  static async get(page: Page) {
    await page.waitForURL(this.path);
    return new ContactPage(page);
  }

  static async goto(page: Page) {
    await page.goto(this.path);
    return new ContactPage(page);
  }

  static path = "/contact";

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

  readonly email = this.content.getByLabel("Email");
  readonly message = this.content.getByLabel("Message");
  readonly pageHeading = this.content.getByRole("heading", {
    level: 2,
    name: "Contact",
  });
  readonly serverError = this.content.getByText("Oops! Something went wrong.");
  readonly subject = this.content.getByLabel("Subject");
  readonly submitButton = this.content.getByRole("button", { name: "Submit" });
}
