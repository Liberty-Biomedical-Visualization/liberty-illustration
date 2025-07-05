import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { describedImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import Header from ".";

describe("Header", () => {
  it("should display the site banner", () => {
    renderHeader();
    const result = screen.getByRole("banner");
    expect(result).toBeVisible();
  });

  it("should display an accessible logo when passed image data with a description", () => {
    renderHeader({ logoData: describedImage });
    const result = screen.getByRole("img", {
      name: describedImage.description,
    });
    expect(result).toBeVisible();
  });

  it("should display a list of links from passed pages when nav list toggle is clicked", async () => {
    const pages = [
      { href: "/", name: "Home" },
      { href: "/portfolio", name: "Portfolio" },
    ];
    renderHeader({ pages });

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

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderHeader({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderHeader();
    expect(result.container).toMatchSnapshot();
  });
});

const renderHeader = createTestRender(Header, {
  disableTabbableDisplayCheck: true,
  logoData: minimalImage,
  pages: [],
});
