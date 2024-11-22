import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  completeImage,
  describedImage,
  longDescribedImage,
  longTitledImage,
  minimalImage,
  titledImage,
} from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";
import truncateText from "@/lib/truncateText";

import Thumbnail, { CAPTION_CHARACTER_LIMIT } from ".";

describe("Thumbnail", () => {
  it("should display a figure", () => {
    renderThumbnail();
    const figure = screen.getByRole("figure");
    expect(figure).toBeVisible();
  });

  it("should render a truncated description when imageData has a long description", () => {
    renderThumbnail({ imageData: longDescribedImage });
    const description = truncateText(
      longDescribedImage.description,
      CAPTION_CHARACTER_LIMIT,
    );
    const result = screen.getByText(description);
    expect(result).toBeInTheDocument();
  });

  it("should render a truncated title when imageData has a long title", () => {
    renderThumbnail({ imageData: longTitledImage });
    const title = truncateText(longTitledImage.title, CAPTION_CHARACTER_LIMIT);
    const result = screen.getByText(title);
    expect(result).toBeInTheDocument();
  });

  it("should not render a description when imageData has no description or title", () => {
    renderThumbnail({ imageData: minimalImage });
    const paragraph = screen.queryByRole("paragraph");
    expect(paragraph).toBeNull();
  });

  it("should display a figure with title as accessible name when imageData has title", () => {
    renderThumbnail({ imageData: titledImage });
    const figure = screen.getByRole("figure", {
      name: titledImage.title,
    });
    expect(figure).toBeVisible();
  });

  it("should display a figure with description as accessible name when imageData has description", () => {
    renderThumbnail({ imageData: describedImage });
    const figure = screen.getByRole("figure", {
      name: describedImage.description,
    });
    expect(figure).toBeVisible();
  });

  it("should display a figure with title and description as accessible name when imageData has title and description", () => {
    renderThumbnail({ imageData: completeImage });
    const figure = screen.getByRole("figure", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    expect(figure).toBeVisible();
  });

  it("should display a button", () => {
    renderThumbnail();
    const button = screen.getByRole("button");
    expect(button).toBeVisible();
  });

  it("should display a button directing the user to view the image by its accessible name when available", () => {
    renderThumbnail({ imageData: completeImage });
    const button = screen.getByRole("button", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    expect(button).toBeVisible();
  });

  it("should call onClick when the button is clicked", async () => {
    const onClick = jest.fn(() => {});
    renderThumbnail({ imageData: completeImage, onClick });

    const user = userEvent.setup();
    const button = screen.getByRole("button", {
      name: `${completeImage.title}: ${completeImage.description}`,
    });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderThumbnail({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderThumbnail();
    expect(result.container).toMatchSnapshot();
  });
});

const renderThumbnail = createTestRender(Thumbnail, {
  imageData: minimalImage,
  onClick: () => {},
});
