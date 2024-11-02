import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import createTestRender from "@/lib/createTestRender";

import Nav from ".";

describe("Nav", () => {
  it("should display navigation", () => {
    renderNav();
    const result = screen.getByRole("navigation");
    expect(result).toBeVisible();
  });

  it("should display a list of links from passed pages", () => {
    const pages = [
      { href: "/", name: "Home" },
      { href: "/portfolio", name: "Portfolio" },
    ];
    renderNav({ pages });

    const listItems = screen.getAllByRole("listitem");

    const homeLink = screen.getByRole("link", { name: "Home" });
    const containsHomeLink = listItems.some((listItem) =>
      listItem.contains(homeLink),
    );
    expect(containsHomeLink).toBe(true);

    const portfolioLink = screen.getByRole("link", { name: "Portfolio" });
    const containsPortfolioLink = listItems.some((listItem) =>
      listItem.contains(portfolioLink),
    );
    expect(containsPortfolioLink).toBe(true);
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderNav({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderNav();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNav = createTestRender(Nav, {
  pages: [],
});
