import { test, expect } from "@playwright/test";

import ContactPage from "@/page-object-models/ContactPage";
import ContactSuccessPage from "@/page-object-models/ContactSuccessPage";

test.describe("Contact", () => {
  test("should submit a contact form successfully", async ({ page }) => {
    await page.route("/api/contact", (route) => route.fulfill({ status: 204 }));

    const contactPage = await ContactPage.goto(page);
    await contactPage.email.fill("foo@bar.com");
    await contactPage.subject.fill("Test subject, please ignore");
    await contactPage.message.fill("This is a test message. Please ignore it.");
    await contactPage.submitButton.click();

    const contactSuccessPage = await ContactSuccessPage.get(page);
    expect(contactSuccessPage.successHeading).toBeVisible();
  });

  test("should display validation errors when server validation fails", async ({
    page,
  }) => {
    const emailValidation = "Email is invalid.";
    const messageValidation = "Message is invalid.";
    const subjectValidation = "Subject is invalid.";
    await page.route("/api/contact", (route) =>
      route.fulfill({
        body: JSON.stringify({
          email: emailValidation,
          message: messageValidation,
          subject: subjectValidation,
        }),
        status: 422,
      }),
    );

    const contactPage = await ContactPage.goto(page);
    await contactPage.email.fill("foo@bar.com");
    await contactPage.subject.fill("Test subject, please ignore");
    await contactPage.message.fill("This is a test message. Please ignore it.");
    await contactPage.submitButton.click();
    await expect(page.getByText(emailValidation)).toBeVisible();
    await expect(page.getByText(subjectValidation)).toBeVisible();
    await expect(page.getByText(messageValidation)).toBeVisible();
  });

  test("should display error when server submission fails", async ({
    page,
  }) => {
    await page.route("/api/contact", (route) => route.fulfill({ status: 500 }));

    const contactPage = await ContactPage.goto(page);
    await contactPage.email.fill("foo@bar.com");
    await contactPage.subject.fill("Test subject, please ignore");
    await contactPage.message.fill("This is a test message. Please ignore it.");
    await contactPage.submitButton.click();
    await expect(contactPage.serverError).toBeVisible();
  });
});
