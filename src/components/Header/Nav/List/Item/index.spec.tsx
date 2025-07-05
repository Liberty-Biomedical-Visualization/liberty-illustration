import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import NavListItem from "./index";

describe("NavListItem", () => {
  it("should display a list item ", () => {
    const children = "Portfolio";
    renderNavListItem({ children });
    const result = screen.getByRole("listitem");
    expect(result).toBeVisible();
  });

  it("should display a link named by the passed children", () => {
    const children = "Portfolio";
    renderNavListItem({ children });
    const result = screen.getByRole("link", { name: children });
    expect(result).toBeVisible();
  });

  it("should propagate the passed href to the link", () => {
    const href = "/home";
    renderNavListItem({ href });
    const result = screen.getByRole("link");
    expect(result).toHaveAttribute("href", href);
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    renderNavListItem({ onClick });

    const user = userEvent.setup();
    const button = screen.getByRole("link");
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderNavListItem({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderNavListItem();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNavListItem = createTestRender(NavListItem, {
  children: "Home",
  href: "/",
  onClick: () => {},
});
