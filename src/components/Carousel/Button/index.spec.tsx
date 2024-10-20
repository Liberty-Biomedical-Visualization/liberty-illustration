import { describe, expect, jest, it } from "@jest/globals";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import CarouselButton from ".";

describe("CarouselButton", () => {
  it('should display a button with text "Next image" when type is next', () => {
    renderCarouselButton({ type: "next" });
    const result = screen.getByRole("button", { name: "Next image" });
    expect(result).toBeVisible();
  });

  it('should display a button with text "Previous image" when type is previous', () => {
    renderCarouselButton({ type: "previous" });
    const result = screen.getByRole("button", { name: "Previous image" });
    expect(result).toBeVisible();
  });

  it("should call onClick when clicked", async () => {
    const onClick = jest.fn(() => {});
    renderCarouselButton({ onClick, type: "next" });

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Next image" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call onClick when disabled", async () => {
    const onClick = jest.fn(() => {});
    renderCarouselButton({ disabled: true, onClick, type: "next" });

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Next image" });
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCarouselButton({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the next button snapshot", () => {
    const result = renderCarouselButton({ type: "next" });
    expect(result.container).toMatchSnapshot();
  });

  it("should match the previous button snapshot", () => {
    const result = renderCarouselButton({ type: "previous" });
    expect(result.container).toMatchSnapshot();
  });
});

const renderCarouselButton = createTestRender(CarouselButton, {
  onClick: () => {},
  type: "next",
});
