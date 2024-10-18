import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import createTestRender from "@/utils/createTestRender";

import { imageA, imageB, imageC } from "./test-data";
import CarouselStage from ".";

describe("CarouselStage", () => {
  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCarouselStage({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  describe("when transition is null", () => {
    const transition = null;

    it("should display the current image", () => {
      renderCarouselStage({ currentImage: imageA, transition });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should not display the next image", () => {
      renderCarouselStage({ nextImage: imageB, transition });
      const nextSlide = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(nextSlide).toBeNull();
    });

    it("should not display the previous image", () => {
      renderCarouselStage({ previousImage: imageC, transition });
      const previousSlide = screen.queryByRole("img", {
        name: imageC.description,
      });
      expect(previousSlide).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarouselStage({ transition });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when transition is next", () => {
    const transition = "next";

    it("should hide the current image", () => {
      renderCarouselStage({ currentImage: imageA, transition });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).not.toBeVisible();
    });

    it("should display the next image", () => {
      renderCarouselStage({ nextImage: imageB, transition });
      const nextSlide = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(nextSlide).toBeVisible();
    });

    it("should not display the previous image", () => {
      renderCarouselStage({ previousImage: imageC, transition });
      const previousSlide = screen.queryByRole("img", {
        name: imageC.description,
      });
      expect(previousSlide).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarouselStage({ transition });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when transition is previous", () => {
    const transition = "previous";

    it("should hide the current image", () => {
      renderCarouselStage({ currentImage: imageA, transition });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).not.toBeVisible();
    });

    it("should not display the next image", () => {
      renderCarouselStage({ nextImage: imageB, transition });
      const nextSlide = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(nextSlide).toBeNull();
    });

    it("should display the previous image", () => {
      renderCarouselStage({ previousImage: imageC, transition });
      const previousSlide = screen.getByRole("img", {
        name: imageC.description,
      });
      expect(previousSlide).toBeVisible();
    });

    it("should match the snapshot", () => {
      const result = renderCarouselStage({ transition });
      expect(result.container).toMatchSnapshot();
    });
  });
});

const renderCarouselStage = createTestRender(CarouselStage, {
  currentImage: imageA,
  nextImage: imageB,
  previousImage: imageC,
  transition: null,
  transitionDuration: 1_000,
});
