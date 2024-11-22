import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import assertIsDefined from "@/lib/assertIsDefined";
import {
  completeImageGallery,
  minimalImageGallery,
} from "@/lib/content/test-image-gallery-data";
import createTestRender from "@/lib/createTestRender";

import Gallery from ".";

describe("Gallery", () => {
  it("should display a second level heading with the gallery title", () => {
    renderGallery({ gallery: minimalImageGallery });
    const heading = screen.getByRole("heading", {
      level: 2,
      name: minimalImageGallery.title,
    });
    expect(heading).toBeVisible();
  });

  it("should display thumbnails when the gallery has images", () => {
    renderGallery({ gallery: completeImageGallery });

    for (const image of completeImageGallery.images) {
      assertIsDefined(image.description);
      const thumbnail = screen.getByRole("img", { name: image.description });
      expect(thumbnail).toBeVisible();
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
});
