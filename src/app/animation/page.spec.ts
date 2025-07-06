import { test, expect, type Page } from "@playwright/test";

import * as content from "@/lib/content";
import AnimationPage from "@/page-object-models/AnimationPage";

test.describe("Animation", () => {
  test("should display the page heading", async ({ page }) => {
    const animationPage = await AnimationPage.goto(page);
    await expect(animationPage.pageHeading).toBeVisible();
  });

  test("should display each video", async ({ page }) => {
    const configuration = await content.getJsonByTitle(
      "Animation Configuration",
    );
    const { videoGalleryId } = configuration;
    const videoGallery = await content.getVideoGallery(videoGalleryId);
    await AnimationPage.goto(page);
    await assertGalleryIsDisplayed(page, videoGallery);
  });
});

async function assertGalleryIsDisplayed(
  page: Page,
  gallery: content.VideoGallery,
) {
  const titles = gallery.videos.map((video) => video.title);

  for (const title of titles) {
    await assertVideoIsDisplayed(page, title);
  }
}

async function assertVideoIsDisplayed(page: Page, title: string) {
  const videos = await page.getByRole("figure", { name: title }).all();
  expect(videos.length).toBeGreaterThan(0);
}
