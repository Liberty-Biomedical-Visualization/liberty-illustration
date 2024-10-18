import { describe, expect, it } from "@jest/globals";
import { isInaccessible, render, screen } from "@testing-library/react";

import AccessiblyHiddenText from ".";

describe("AccessiblyHiddenText", () => {
  const children = "This is some accessible but visually hidden text.";

  it("should display passed children", () => {
    render(<AccessiblyHiddenText>{children}</AccessiblyHiddenText>);
    const result = screen.getByText(children);
    expect(result).toBeVisible();
  });

  it("should be accessible", () => {
    render(<AccessiblyHiddenText>{children}</AccessiblyHiddenText>);
    const element = screen.getByText(children);
    const result = isInaccessible(element);
    expect(result).toBe(false);
  });

  it("should match the snapshot", () => {
    const result = render(
      <AccessiblyHiddenText>{children}</AccessiblyHiddenText>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
