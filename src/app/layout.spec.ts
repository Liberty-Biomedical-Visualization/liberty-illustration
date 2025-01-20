import { test, expect } from "@playwright/test";

import ContactPage from "@/page-object-models/ContactPage";
import HomePage from "@/page-object-models/HomePage";
import PortfolioPage from "@/page-object-models/PortfolioPage";

test.describe("Layout", () => {
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

  test("should navigate to the Contact page clicking on the Contact link", async ({
    baseURL,
    page,
  }) => {
    const homePage = await HomePage.goto(page);
    await homePage.clickContactLink();
    expect(page.url()).toBe(baseURL + ContactPage.path);
  });

  test("should navigate to the Home page clicking on the Home link", async ({
    baseURL,
    page,
  }) => {
    const portfolioPage = await PortfolioPage.goto(page);
    await portfolioPage.clickHomeLink();
    expect(page.url()).toBe(baseURL + HomePage.path);
  });

  test("should navigate to the Portfolio page when clicking on the Portfolio link", async ({
    baseURL,
    page,
  }) => {
    const homePage = await HomePage.goto(page);
    await homePage.clickPortfolioLink();
    expect(page.url()).toBe(baseURL + PortfolioPage.path);
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
