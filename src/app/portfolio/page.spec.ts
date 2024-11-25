import { test, expect, type Locator, type Page } from "@playwright/test";

import { atChecked } from "@/lib/array";
import * as content from "@/lib/content";
import describeGallery from "@/lib/describeGallery";
import PortfolioPage from "@/page-object-models/PortfolioPage";

test.describe("Portfolio", () => {
  test("should display a thumbnail for each image", async ({ page }) => {
    const configuration = await content.getJsonByTitle(
      "Portfolio Configuration",
    );
    const { imageGalleryIds } = configuration;
    const imageGalleryRequests = imageGalleryIds.map(content.getImageGallery);
    const imageGalleries = await Promise.all(imageGalleryRequests);
    const siteMetadata = await content.getJsonByTitle("Site Metadata");
    const describedGalleries = imageGalleries.map((gallery) =>
      describeGallery(gallery, siteMetadata.author),
    );

    await PortfolioPage.goto(page);

    for (const gallery of describedGalleries) {
      await assertGalleryIsDisplayed(page, gallery);
    }
  });

  test("should display a dialog when a thumbnail is clicked", async ({
    page,
  }) => {
    await PortfolioPage.goto(page);
    const heading = page.getByRole("heading", { level: 2 });
    const sections = await page.locator("section", { has: heading }).all();
    const section = atChecked(sections, 0);
    const images = await section.getByRole("img").all();
    const image = atChecked(images, 0);
    await image.click();
    const dialog = page.getByRole("dialog");
    expect(dialog).toBeVisible();
  });
});

async function assertGalleryIsDisplayed(
  page: Page,
  gallery: content.ImageGallery,
) {
  const heading = page.getByRole("heading", {
    exact: true,
    level: 2,
    name: gallery.title,
  });

  const section = page.locator("section", { has: heading });
  const descriptions = gallery.images.map((image) => image.description ?? "");

  for (const description of descriptions) {
    await assertThumbnailIsDisplayed(section, description);
  }
}

async function assertThumbnailIsDisplayed(
  section: Locator,
  description: string,
) {
  const images = await section.getByRole("img", { name: description }).all();
  expect(images.length).toBeGreaterThan(0);
}
