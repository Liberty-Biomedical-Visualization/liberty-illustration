import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import {
  completeImage,
  describedImage,
  minimalImage,
} from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import CarouselSlide from ".";

describe("CarouselSlide", () => {
  it("should display image with description as accessible name when imageData has description", () => {
    renderCarouselSlide({ imageData: describedImage });
    const result = screen.getByRole("img", {
      name: describedImage.description,
    });
    expect(result).toBeVisible();
  });

  it("should display image with title as accessible description when imageData has description and title", () => {
    renderCarouselSlide({ imageData: completeImage });
    const result = screen.getByRole("img", {
      description: completeImage.title,
    });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCarouselSlide({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderCarouselSlide();
    expect(result.container).toMatchSnapshot();
  });
});

const renderCarouselSlide = createTestRender(CarouselSlide, {
  imageData: minimalImage,
});
