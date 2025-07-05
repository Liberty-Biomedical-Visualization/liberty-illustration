import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import Nav from ".";

describe("Nav", () => {
  it("should display a navigation toggle button", () => {
    renderNav();
    const result = screen.getByRole("button", { name: "Navigation" });
    expect(result).toBeVisible();
  });

  it("should display navigation when toggle button is clicked", async () => {
    renderNav();

    const user = userEvent.setup();
    const listToggle = screen.getByRole("button", { name: "Navigation" });
    await user.click(listToggle);

    const result = screen.getByRole("navigation");
    expect(result).toBeVisible();
  });

  it("should not display navigation when toggle is not clicked", () => {
    renderNav();
    const list = screen.getByRole("navigation", { hidden: true });
    expect(list).not.toBeVisible();
  });

  it("should display a list of links from passed pages when list toggle is clicked", async () => {
    const pages = [
      { href: "/", name: "Home" },
      { href: "/portfolio", name: "Portfolio" },
    ];
    renderNav({ pages });

    const user = userEvent.setup();
    const listToggle = screen.getByRole("button", { name: "Navigation" });
    await user.click(listToggle);

    const list = screen.getByRole("list");
    expect(list).toBeVisible();

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

  it("should pass className to the navigation element", () => {
    const className = "foo";
    renderNav({ className });
    const navigation = screen.getByRole("navigation", { hidden: true });
    expect(navigation).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderNav();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNav = createTestRender(Nav, {
  disableTabbableDisplayCheck: true,
  pages: [],
});
