import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import assertIsDefined from "@/lib/assertIsDefined";
import {
  completeImageGallery,
  minimalImageGallery,
} from "@/lib/content/test-image-gallery-data";
import createTestRender from "@/lib/createTestRender";

import Gallery from ".";
import { atChecked } from "@/lib/array";

describe("Gallery", () => {
  it("should display a second level heading with the gallery title", () => {
    renderGallery({ gallery: minimalImageGallery });
    const heading = screen.getByRole("heading", {
      level: 2,
      name: minimalImageGallery.title,
    });
    expect(heading).toBeVisible();
  });

  it("should display images when the gallery has images", () => {
    renderGallery({ gallery: completeImageGallery });

    for (const image of completeImageGallery.images) {
      assertIsDefined(image.description);
      const img = screen.getByRole("img", { name: image.description });
      expect(img).toBeVisible();
    }
  });

  it("should should call onClick with the index of each image when clicked", async () => {
    const onImageClick = jest.fn();
    renderGallery({ gallery: completeImageGallery, onImageClick });
    const user = userEvent.setup();

    for (let index = 0; index < completeImageGallery.images.length; ++index) {
      const image = atChecked(completeImageGallery.images, index);
      assertIsDefined(image.description);
      const img = screen.getByRole("img", { name: image.description });
      await user.click(img);
      expect(onImageClick).toHaveBeenCalledWith(index);
    }
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderGallery({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderGallery();
    expect(result.container).toMatchSnapshot();
  });
});

const renderGallery = createTestRender(Gallery, {
  gallery: minimalImageGallery,
  onImageClick: () => {},
});
