import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import { describedImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import Brand from ".";

describe("Brand", () => {
  it("should display the top-level heading", () => {
    renderBrand();
    const result = screen.getByRole("heading", {
      level: 1,
      name: "Abigail Richbourg Liberty, MS, CMI Biomedical illustration • Animation • Graphic design",
    });
    expect(result).toBeVisible();
  });

  it("should display an accessible logo when passed image data with a description", () => {
    renderBrand({ logoData: describedImage });
    const result = screen.getByRole("img", {
      name: describedImage.description,
    });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderBrand({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderBrand();
    expect(result.container).toMatchSnapshot();
  });
});

const renderBrand = createTestRender(Brand, {
  logoData: minimalImage,
});
