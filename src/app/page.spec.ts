import { test, expect } from "@playwright/test";

import HomePage from "@/page-object-models/HomePage";

test.describe("Home", () => {
  test("should display site logo", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.siteLogo).toBeVisible();
  });

  test("should display primary heading", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.siteHeading).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.navigation).toBeVisible();
  });

  test("should not navigate when clicking on the Home link", async ({
    baseURL,
    page,
  }) => {
    const homePage = await HomePage.goto(page);
    await homePage.clickHomeLink();
    expect(page.url()).toBe(baseURL + HomePage.path);
  });

  test("should transition to new image after a period of time", async ({
    page,
  }) => {
    const homePage = await HomePage.goto(page);

    await expect(homePage.firstImage).toBeVisible();
    await expect(homePage.secondImage).toBeHidden();

    // Transition begins after a period of time.

    await expect(homePage.secondImage).toBeVisible({ timeout: 10_000 });
    await expect(homePage.firstImage).toBeVisible();

    // Transition completes after a period of time.

    await expect(homePage.secondImage).toBeHidden();
    await expect(homePage.firstImage).toBeVisible();
  });

  test("should transition to new image when next image button is clicked", async ({
    page,
  }) => {
    const homePage = await HomePage.goto(page);

    await expect(homePage.firstImage).toBeVisible();
    await expect(homePage.secondImage).toBeHidden();

    await homePage.clickNextImageButton();

    await expect(homePage.secondImage).toBeVisible();
    await expect(homePage.firstImage).toBeVisible();

    // Transition completes after a period of time.

    await expect(homePage.secondImage).toBeHidden();
    await expect(homePage.firstImage).toBeVisible();
  });

  test("should transition to new image when previous image button is clicked", async ({
    page,
  }) => {
    const homePage = await HomePage.goto(page);

    await expect(homePage.firstImage).toBeVisible();
    await expect(homePage.secondImage).toBeHidden();

    await homePage.clickPreviousImageButton();

    await expect(homePage.secondImage).toBeVisible();
    await expect(homePage.firstImage).toBeVisible();

    // Transition completes after a period of time.

    await expect(homePage.secondImage).toBeHidden();
    await expect(homePage.firstImage).toBeVisible();
  });

  test("should disable buttons during a transition", async ({ page }) => {
    const homePage = await HomePage.goto(page);

    await expect(homePage.nextImageButton).toBeEnabled();
    await expect(homePage.previousImageButton).toBeEnabled();

    await homePage.clickNextImageButton();

    await expect(homePage.nextImageButton).toBeDisabled();
    await expect(homePage.previousImageButton).toBeDisabled();

    // Transition completes after a period of time.

    await expect(homePage.nextImageButton).toBeEnabled();
    await expect(homePage.previousImageButton).toBeEnabled();
  });

  test("should display CMI logo", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.cmiLogo).toBeVisible();
  });

  test("should display CMI text", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.cmiText).toBeVisible();
  });

  test("should display AMI logo", async ({ page }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.amiLogo).toBeVisible();
  });

  test("should display copyright notice with current year", async ({
    page,
  }) => {
    const homePage = await HomePage.goto(page);
    await expect(homePage.copyrightNotice).toBeVisible();
  });
});
