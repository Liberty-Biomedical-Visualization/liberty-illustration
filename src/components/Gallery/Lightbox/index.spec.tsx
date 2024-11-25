import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { imageA, imageB, imageC } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import Lightbox from ".";

describe("Lightbox", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should display a dialog", () => {
    renderLightbox();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();
  });

  it("should call onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    renderLightbox({ onClose });

    const user = userEvent.setup();
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("should call onClose when the escape key is pressed", async () => {
    const onClose = jest.fn();
    renderLightbox({ onClose });

    const user = userEvent.setup();
    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });

  it("should display a dialog when visibility transition elapses", async () => {
    jest.useFakeTimers();
    const visibilityTransitionDuration = 500;
    renderLightbox({ visibilityTransitionDuration });
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toBeVisible();

    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(dialog).toBeVisible();
  });

  it("should hide dialog when the close button is clicked and visibility transition elapses", async () => {
    jest.useFakeTimers();
    const visibilityTransitionDuration = 500;
    renderLightbox({ visibilityTransitionDuration });
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toBeVisible();

    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(dialog).toBeVisible();

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTimeAsync,
    });
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(dialog).not.toBeVisible();
  });

  it("should hide dialog when the escape key is pressed and visibility transition elapses", async () => {
    jest.useFakeTimers();
    const visibilityTransitionDuration = 500;
    renderLightbox({ visibilityTransitionDuration });
    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toBeVisible();

    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(dialog).toBeVisible();

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTimeAsync,
    });
    await user.keyboard("{Escape}");
    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(dialog).not.toBeVisible();
  });

  it("should call onClose when the close button is clicked and visibility transition elapses", async () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const visibilityTransitionDuration = 500;
    renderLightbox({ onClose, visibilityTransitionDuration });

    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTimeAsync,
    });
    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    await act(() =>
      jest.advanceTimersByTimeAsync(visibilityTransitionDuration),
    );

    expect(onClose).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderLightbox({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  describe("when passed zero images", () => {
    const images = [] as const;

    it("should not display any images", () => {
      renderLightbox({ images });
      const anySlide = screen.queryByRole("img");
      expect(anySlide).toBeNull();
    });

    it("should not display the next button", () => {
      renderLightbox({ images });
      const button = screen.queryByRole("button", { name: "Next image" });
      expect(button).toBeNull();
    });

    it("should not display the previous button", () => {
      renderLightbox({ images });
      const button = screen.queryByRole("button", { name: "Previous image" });
      expect(button).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderLightbox({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed one image", () => {
    const images = [imageA] as const;

    it("should display the current image", () => {
      renderLightbox({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should not display the next button", () => {
      renderLightbox({ images });
      const button = screen.queryByRole("button", { name: "Next image" });
      expect(button).toBeNull();
    });

    it("should not display the previous button", () => {
      renderLightbox({ images });
      const button = screen.queryByRole("button", { name: "Previous image" });
      expect(button).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderLightbox({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed two images", () => {
    const images = [imageA, imageB] as const;

    it("should display the current image", () => {
      renderLightbox({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should advance to the next image when the next button is clicked", async () => {
      renderLightbox({ images });
      const imageBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(imageBeforeAdvance).toBeNull();

      const user = userEvent.setup();
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);

      const imageAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(imageAfterAdvance).toBeVisible();
    });

    it("should hide the current image when the next button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const imageTransitionDuration = 100;
      renderLightbox({ images, imageTransitionDuration });
      const imageBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(imageBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);
      await act(() => jest.advanceTimersByTimeAsync(imageTransitionDuration));

      const imageAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(imageAfterTransition).toBeNull();
    });

    it("should regress to the previous image when the previous button is clicked", async () => {
      renderLightbox({ images });
      const imageBeforeRegress = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(imageBeforeRegress).toBeNull();

      const user = userEvent.setup();
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);

      const imageAfterRegress = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(imageAfterRegress).toBeVisible();
    });

    it("should hide the current image when the previous button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const imageTransitionDuration = 100;
      renderLightbox({ images, imageTransitionDuration });
      const imageBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(imageBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);
      await act(() => jest.advanceTimersByTimeAsync(imageTransitionDuration));

      const imageAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(imageAfterTransition).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderLightbox({ images });
      expect(result.container).toMatchSnapshot();
    });
  });

  describe("when passed multiple images", () => {
    const images = [imageA, imageB, imageC] as const;

    it("should display the current image", () => {
      renderLightbox({ images });
      const currentSlide = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(currentSlide).toBeVisible();
    });

    it("should advance to the next image when the next button is clicked", async () => {
      renderLightbox({ images });
      const imageBeforeAdvance = screen.queryByRole("img", {
        name: imageB.description,
      });
      expect(imageBeforeAdvance).toBeNull();

      const user = userEvent.setup();
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);

      const imageAfterAdvance = screen.getByRole("img", {
        name: imageB.description,
      });
      expect(imageAfterAdvance).toBeVisible();
    });

    it("should hide the current image when the next button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const imageTransitionDuration = 100;
      renderLightbox({ images, imageTransitionDuration });
      const imageBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(imageBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const nextButton = screen.getByRole("button", { name: "Next image" });
      await user.click(nextButton);
      await act(() => jest.advanceTimersByTimeAsync(imageTransitionDuration));

      const imageAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(imageAfterTransition).toBeNull();
    });

    it("should regress to the previous image when the previous button is clicked", async () => {
      renderLightbox({ images });
      const imageBeforeRegress = screen.queryByRole("img", {
        name: imageC.description,
      });
      expect(imageBeforeRegress).toBeNull();

      const user = userEvent.setup();
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);

      const imageAfterRegress = screen.getByRole("img", {
        name: imageC.description,
      });
      expect(imageAfterRegress).toBeVisible();
    });

    it("should hide the current image when the previous button is clicked and the transition is completed", async () => {
      jest.useFakeTimers();
      const imageTransitionDuration = 100;
      renderLightbox({ images, imageTransitionDuration });
      const imageBeforeTransition = screen.getByRole("img", {
        name: imageA.description,
      });
      expect(imageBeforeTransition).toBeVisible();

      const user = userEvent.setup({
        advanceTimers: jest.advanceTimersByTimeAsync,
      });
      const previousButton = screen.getByRole("button", {
        name: "Previous image",
      });
      await user.click(previousButton);
      await act(() => jest.advanceTimersByTimeAsync(imageTransitionDuration));

      const imageAfterTransition = screen.queryByRole("img", {
        name: imageA.description,
      });
      expect(imageAfterTransition).toBeNull();
    });

    it("should match the snapshot", () => {
      const result = renderLightbox({ images });
      expect(result.container).toMatchSnapshot();
    });
  });
});

const renderLightbox = createTestRender(Lightbox, {
  disableTabbableDisplayCheck: true,
  imageIndex: 0,
  images: [],
  imageTransitionDuration: 1_000,
  onClose: () => {},
  visibilityTransitionDuration: null,
});
