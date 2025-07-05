import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { atChecked } from "@/lib/array";
import assertIsDefined from "@/lib/assertIsDefined";
import {
  completeImageGallery,
  minimalImageGallery,
} from "@/lib/content/test-image-gallery-data";
import createTestRender from "@/lib/createTestRender";

import Gallery from ".";

describe("Gallery", () => {
  it("should display thumbnails when the gallery has images", () => {
    renderGallery({ gallery: completeImageGallery });

    for (const image of completeImageGallery.images) {
      assertIsDefined(image.description);
      const thumbnail = screen.getByRole("img", { name: image.description });
      expect(thumbnail).toBeVisible();
    }
  });

  it("should display a dialog containing a captioned figure of a thumbnail when clicked", async () => {
    renderGallery({ gallery: completeImageGallery });
    const image = atChecked(completeImageGallery.images, 0);
    assertIsDefined(image.description);
    const thumbnail = screen.getByRole("img", { name: image.description });
    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBeNull();

    const user = userEvent.setup();
    await user.click(thumbnail);

    const displayedDialog = screen.getByRole("dialog");
    expect(displayedDialog).toBeVisible();

    const figure = screen.getByRole("figure", {
      name: `${image.title} ${image.description}`,
    });
    const result = displayedDialog.contains(figure);
    expect(result).toBe(true);
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
  disableTabbableDisplayCheck: true,
  gallery: minimalImageGallery,
  lightboxImageTransitionDuration: 1_000,
  lightboxVisibilityTransitionDuration: 500,
});
