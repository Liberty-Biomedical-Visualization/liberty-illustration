import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import PageHeading from ".";
import createTestRender from "@/lib/createTestRender";

describe("PageHeading", () => {
  it("should display an level two heading", () => {
    const children = "Medical Illustration";
    renderPageHeading({ children });
    const result = screen.getByRole("heading", { level: 2, name: children });
    expect(result).toBeInTheDocument();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderPageHeading({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderPageHeading();
    expect(result.container).toMatchSnapshot();
  });
});

const renderPageHeading = createTestRender(PageHeading, {
  children: "Medical Illustration",
});
