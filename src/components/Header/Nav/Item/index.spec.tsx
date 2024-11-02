import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import createTestRender from "@/lib/createTestRender";

import NavItem from ".";

describe("NavItem", () => {
  it("should display a link named by the passed children", () => {
    const children = "Portfolio";
    renderNavItem({ children });
    const result = screen.getByRole("link", { name: children });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderNavItem({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderNavItem();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNavItem = createTestRender(NavItem, {
  children: "Home",
  href: "/",
});
