import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import {
  completeVideoGallery,
  minimalVideoGallery,
} from "@/lib/content/test-video-gallery-data";
import createTestRender from "@/lib/createTestRender";

import VideoGallery from ".";

describe("VideoGallery", () => {
  it("should display videos when the gallery has video data", () => {
    renderVideoGallery({ gallery: completeVideoGallery });

    for (const videoData of completeVideoGallery.videos) {
      const video = screen.getByRole("figure", { name: videoData.title });
      expect(video).toBeVisible();
    }
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderVideoGallery({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderVideoGallery();
    expect(result.container).toMatchSnapshot();
  });
});

const renderVideoGallery = createTestRender(VideoGallery, {
  gallery: minimalVideoGallery,
});
