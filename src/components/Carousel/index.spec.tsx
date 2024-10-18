import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/utils/createTestRender";

import { imageA, imageB, imageC } from "./test-data";
import Carousel from ".";

describe("Carousel", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should disable the next button during a transition", async () => {
    jest.useFakeTimers();
    const slideDuration = 300;
    const transitionDuration = 100;
    renderCarousel({ slideDuration, transitionDuration });
    const button = screen.getByRole("button", { name: "Next image" });
    expect(button).not.toBeDisabled();

    await act(() => jest.advanceTimersByTimeAsync(slideDuration));
    expect(button).toBeDisabled();

    await act(() => jest.advanceTimersByTimeAsync(transitionDuration));
    expect(button).not.toBeDisabled();
  });

  it("should disable the previous button during a transition", async () => {
    jest.useFakeTimers();
    const slideDuration = 300;
    const transitionDuration = 100;
    renderCarousel({ slideDuration, transitionDuration });
    const button = screen.getByRole("button", { name: "Previous image" });
    expect(button).not.toBeDisabled();

    await act(() => jest.advanceTimersByTimeAsync(slideDuration));
    expect(button).toBeDisabled();

    await act(() => jest.advanceTimersByTimeAsync(transitionDuration));
    expect(button).not.toBeDisabled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCarousel({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  describe("when passed zero images", () => {
    const images = [] as const;

    it("should not display any slides", () => {
      renderCarousel({ images });
      const anySlide = screen.queryByRole("img");
      expect(anySlide).toBeNull();
    });

    it("should not display the next button", () => {
      renderCarousel({ images });
      const button = screen.queryByRole("button", { name: "Next image" });
      expect(button).toBeNull();
    });

    it("should not display the previous button", () => {
      renderCarousel({ images });
      const button = screen.queryByRole("button", { name: "Previous image" });
      expect(button).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarousel({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed one image", () => {
    const images = [imageA] as const;

    it("should display the current slide", () => {
      renderCarousel({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should not advance slides when the slideDuration elapses", async () => {
      jest.useFakeTimers();
      const slideDuration = 300;
      renderCarousel({ images, slideDuration });
      const slideBeforeElapse = screen.getByRole("img", {
        name: imageA.description,
      });

      await act(() => jest.advanceTimersByTimeAsync(slideDuration));

      const slideAfterElapse = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeElapse).toBe(slideAfterElapse);
    });

    it("should not display the next button", () => {
      renderCarousel({ images });
      const button = screen.queryByRole("button", { name: "Next image" });
      expect(button).toBeNull();
    });

    it("should not display the previous button", () => {
      renderCarousel({ images });
      const button = screen.queryByRole("button", { name: "Previous image" });
      expect(button).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarousel({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed two images", () => {
    const images = [imageA, imageB] as const;

    it("should display the current slide", () => {
      renderCarousel({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should advance to the next slide when the slideDuration elapses", async () => {
      jest.useFakeTimers();
      const slideDuration = 300;
      renderCarousel({ images, slideDuration });
      const slideBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(slideBeforeAdvance).toBeNull();

      await act(() => jest.advanceTimersByTimeAsync(slideDuration));

      const slideAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(slideAfterAdvance).toBeVisible();
    });

    it("should hide the current slide when the slideDuration elapses and the transition is completed", async () => {
      jest.useFakeTimers();
      const slideDuration = 300;
      const transitionDuration = 100;
      renderCarousel({ images, slideDuration, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const waitDuration = slideDuration + transitionDuration;
      await act(() => jest.advanceTimersByTimeAsync(waitDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should advance to the next slide when the next button is clicked", async () => {
      renderCarousel({ images });
      const slideBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(slideBeforeAdvance).toBeNull();

      const user = userEvent.setup();
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);

      const slideAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(slideAfterAdvance).toBeVisible();
    });

    it("should hide the current slide when the next button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const transitionDuration = 100;
      renderCarousel({ images, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);
      await act(() => jest.advanceTimersByTimeAsync(transitionDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should regress to the previous slide when the previous button is clicked", async () => {
      renderCarousel({ images });
      const slideBeforeRegress = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(slideBeforeRegress).toBeNull();

      const user = userEvent.setup();
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);

      const slideAfterRegress = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(slideAfterRegress).toBeVisible();
    });

    it("should hide the current slide when the previous button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const transitionDuration = 100;
      renderCarousel({ images, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);
      await act(() => jest.advanceTimersByTimeAsync(transitionDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarousel({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed multiple images", () => {
    const images = [imageA, imageB, imageC] as const;

    it("should display the current slide", () => {
      renderCarousel({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should advance to the next slide when the slideDuration elapses", async () => {
      jest.useFakeTimers();
      const slideDuration = 300;
      renderCarousel({ images, slideDuration });
      const slideBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(slideBeforeAdvance).toBeNull();

      await act(() => jest.advanceTimersByTimeAsync(slideDuration));

      const slideAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(slideAfterAdvance).toBeVisible();
    });

    it("should hide the current slide when the slideDuration elapses and the transition is completed", async () => {
      jest.useFakeTimers();
      const slideDuration = 300;
      const transitionDuration = 100;
      renderCarousel({ images, slideDuration, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const waitDuration = slideDuration + transitionDuration;
      await act(() => jest.advanceTimersByTimeAsync(waitDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should advance to the next slide when the next button is clicked", async () => {
      renderCarousel({ images });
      const slideBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(slideBeforeAdvance).toBeNull();

      const user = userEvent.setup();
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);

      const slideAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(slideAfterAdvance).toBeVisible();
    });

    it("should hide the current slide when the next button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const transitionDuration = 100;
      renderCarousel({ images, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);
      await act(() => jest.advanceTimersByTimeAsync(transitionDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should regress to the previous slide when the previous button is clicked", async () => {
      renderCarousel({ images });
      const slideBeforeRegress = screen.queryByRole("img", {
        name: imageC.description,
      });
      expect(slideBeforeRegress).toBeNull();

      const user = userEvent.setup();
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);

      const slideAfterRegress = screen.getByRole("img", {
        name: imageC.description,
      });
      expect(slideAfterRegress).toBeVisible();
    });

    it("should hide the current slide when the previous button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const transitionDuration = 100;
      renderCarousel({ images, transitionDuration });
      const slideBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(slideBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);
      await act(() => jest.advanceTimersByTimeAsync(transitionDuration));

      const slideAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(slideAfterTransition).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderCarousel({ images });
      expect(result.container).toMatchSnapshot();
    });
  });
});

const renderCarousel = createTestRender(Carousel, {
  images: [imageA, imageB, imageC],
  slideDuration: 5_000,
  transitionDuration: 1_000,
});
