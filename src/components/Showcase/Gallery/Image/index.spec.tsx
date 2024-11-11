import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  completeImage,
  describedImage,
  minimalImage,
  titledImage,
} from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import GalleryImage from ".";

describe("GalleryImage", () => {
  it("should display a figure", () => {
    renderGalleryImage();
    const figure = screen.getByRole("figure");
    expect(figure).toBeVisible();
  });

  it("should not display a description when imageData has no description or title", () => {
    renderGalleryImage({ imageData: minimalImage });
    const paragraph = screen.queryByRole("paragraph");
    expect(paragraph).toBeNull();
  });

  it("should display a figure with title as accessible name when imageData has title", () => {
    renderGalleryImage({ imageData: titledImage });
    const figure = screen.getByRole("figure", {
      name: titledImage.title,
    });
    expect(figure).toBeVisible();
  });

  it("should display a figure with description as accessible name when imageData has description", () => {
    renderGalleryImage({ imageData: describedImage });
    const figure = screen.getByRole("figure", {
      name: describedImage.description,
    });
    expect(figure).toBeVisible();
  });

  it("should display a figure with title and description as accessible name when imageData has title and description", () => {
    renderGalleryImage({ imageData: completeImage });
    const figure = screen.getByRole("figure", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    expect(figure).toBeVisible();
  });

  it("should display a button", () => {
    renderGalleryImage();
    const button = screen.getByRole("button");
    expect(button).toBeVisible();
  });

  it("should display a button directing the user to view the image by its accessible name when available", () => {
    renderGalleryImage({ imageData: completeImage });
    const button = screen.getByRole("button", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    expect(button).toBeVisible();
  });

  it("should call onClick when the button is clicked", async () => {
    const onClick = jest.fn(() => {});
    renderGalleryImage({ imageData: completeImage, onClick });

    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderGalleryImage({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderGalleryImage();
    expect(result.container).toMatchSnapshot();
  });
});

const renderGalleryImage = createTestRender(GalleryImage, {
  imageData: minimalImage,
  onClick: () => {},
});
