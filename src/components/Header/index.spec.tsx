import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

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
  logoData: minimalImage,
});
