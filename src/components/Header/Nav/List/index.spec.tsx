import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import NavList from "./index";

describe("NavList", () => {
  it("should display a list", () => {
    renderNavList();
    const result = screen.getByRole("list");
    expect(result).toBeVisible();
  });

  it("should display list items containing links from passed pages", () => {
    const pages = [
      { href: "/", name: "Home" },
      { href: "/portfolio", name: "Portfolio" },
    ];
    renderNavList({ pages });

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

  it("should call onItemClick when link is clicked", async () => {
    const pages = [{ href: "/", name: "Home" }];
    const onItemClick = jest.fn();
    renderNavList({ onItemClick, pages });

    const user = userEvent.setup();
    const link = screen.getByRole("link");
    await user.click(link);

    expect(onItemClick).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderNavList({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderNavList();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNavList = createTestRender(NavList, {
  onItemClick: () => {},
  pages: [],
});
