import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import createTestRender from "@/utils/createTestRender";

import CarouselSlide from ".";

describe("CarouselSlide", () => {
  it("should display image with description as accessible name", () => {
    const description = "A fancy imaginary image used for testing.";
    const image = {
      description,
      height: 100,
      src: "https://foo.com/img.jpg",
      title: "Test Image",
      width: 100,
    };
    renderCarouselSlide({ image });

    const result = screen.getByRole("img", { name: description });
    expect(result).toBeVisible();
  });

  it("should display image with title as accessible description", () => {
    const title = "Fancy Test Image";
    const image = {
      description: "An imaginary image used for testing.",
      height: 100,
      src: "https://foo.com/img.jpg",
      title,
      width: 100,
    };
    renderCarouselSlide({ image });

    const result = screen.getByRole("img", { description: title });
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
  image: {
    description: "An imaginary image used for testing.",
    height: 100,
    src: "https://foo.com/img.jpg",
    title: "Test Image",
    width: 100,
  },
});
