import { test, expect } from "@playwright/test";

import ContactSuccessPage from "@/page-object-models/ContactSuccessPage";

test.describe("Contact Success", () => {
  test("should display success heading", async ({ page }) => {
    const contactSuccessPage = await ContactSuccessPage.goto(page);
    await expect(contactSuccessPage.successHeading).toBeVisible();
  });
});
