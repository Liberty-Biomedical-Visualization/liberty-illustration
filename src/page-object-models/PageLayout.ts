import type { Locator, Page } from "@playwright/test";

import PageObjectModel from "./PageObjectModel";

export default class PageLayout extends PageObjectModel {
  protected constructor(page: Page) {
    super(page);
    const currentYear = new Date().getFullYear();
    this.copyrightNotice = this.page.getByText(
      `© 2014–${currentYear} Abigail Richbourg`,
    );
  }

  readonly amiLogo = this.page.getByRole("img", {
    name: "Association of Medical",
  });
  readonly cmiLogo = this.page.getByRole("img", {
    name: "Certified Medical Illustrator",
  });
  readonly cmiText = this.page.getByText(
    "Board Certified Medical Illustrator by the Board of Certification of Medical",
  );
  readonly copyrightNotice: Locator;
  readonly navigation = this.page.getByRole("navigation");
  readonly siteHeading = this.page.getByRole("heading", {
    level: 1,
    name: "Abigail Richbourg Liberty, MS",
  });
  readonly siteLogo = this.page.getByRole("img", {
    name: "Liberty Biomedical",
  });

  protected contactLink = this.navigation.getByRole("link", {
    name: "Contact",
  });
  protected content = this.page.getByRole("main");
  protected homeLink = this.navigation.getByRole("link", { name: "Home" });
  protected portfolioLink = this.navigation.getByRole("link", {
    name: "Portfolio",
  });
}
