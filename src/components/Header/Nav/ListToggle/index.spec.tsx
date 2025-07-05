import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import NavListToggle from "./index";

describe("NavListToggle", () => {
  it("should display a button", () => {
    renderNavListToggle();
    const result = screen.getByRole("button");
    expect(result).toBeVisible();
  });

  it('should display text content "Navigation"', () => {
    renderNavListToggle({ listIsShown: false });
    const result = screen.getByRole("button", { name: "Navigation" });
    expect(result).toBeVisible();
  });

  it("should not be expanded when listIsShown is false", () => {
    renderNavListToggle({ listIsShown: false });
    const result = screen.getByRole("button", { expanded: false });
    expect(result).toBeVisible();
  });

  it("should be expanded when listIsShown is true", () => {
    renderNavListToggle({ listIsShown: true });
    const result = screen.getByRole("button", { expanded: true });
    expect(result).toBeVisible();
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn();
    renderNavListToggle({ onClick });

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderNavListToggle({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should pass id to the outermost element", () => {
    const id = "foo";
    const result = renderNavListToggle({ id });
    expect(result.container.firstChild).toHaveAttribute("id", id);
  });

  it("should match the snapshot", () => {
    const result = renderNavListToggle();
    expect(result.container).toMatchSnapshot();
  });
});

const renderNavListToggle = createTestRender(NavListToggle, {
  id: "nav-list-toggle",
  listIsShown: false,
  navListId: "nav-list",
  onClick: () => {},
});
