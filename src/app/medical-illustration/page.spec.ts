import { test, expect, type Page } from "@playwright/test";

import * as content from "@/lib/content";
import describeGallery from "@/lib/describeGallery";
import MedicalIllustrationPage from "@/page-object-models/MedicalIllustrationPage";

test.describe("Medical Illustration", () => {
  test("should display the page heading", async ({ page }) => {
    const medicalIllustrationPage = await MedicalIllustrationPage.goto(page);
    expect(medicalIllustrationPage.pageHeading).toBeVisible();
  });

  test("should display a thumbnail for each image", async ({ page }) => {
    const configuration = await content.getJsonByTitle(
      "Medical Illustration Configuration",
    );
    const { imageGalleryId } = configuration;
    const imageGallery = await content.getImageGallery(imageGalleryId);
    const siteMetadata = await content.getJsonByTitle("Site Metadata");
    const describedGallery = describeGallery(imageGallery, siteMetadata.author);
    await MedicalIllustrationPage.goto(page);
    await assertGalleryIsDisplayed(page, describedGallery);
  });
});

async function assertGalleryIsDisplayed(
  page: Page,
  gallery: content.ImageGallery,
) {
  const descriptions = gallery.images.map((image) => image.description ?? "");

  for (const description of descriptions) {
    await assertThumbnailIsDisplayed(page, description);
  }
}

async function assertThumbnailIsDisplayed(page: Page, description: string) {
  const images = await page.getByRole("img", { name: description }).all();
  expect(images.length).toBeGreaterThan(0);
}
