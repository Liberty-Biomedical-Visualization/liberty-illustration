import { describe, it, expect } from "@jest/globals";
import { screen } from "@testing-library/react";

import createTestRender from "@/lib/createTestRender";
import { videoA } from "@/lib/content/test-video-data";

import Video from ".";

describe("Video", () => {
  it("should display title as figure name", () => {
    renderVideo({ videoData: videoA });
    const figure = screen.getByRole("figure", { name: videoA.title });
    expect(figure).toBeVisible();
  });

  it("should pass title to iframe", () => {
    renderVideo({ videoData: videoA });
    const iframe = screen.getByTitle(videoA.title);
    expect(iframe).toBeVisible();
  });

  it("should pass url as iframe src", () => {
    renderVideo({ videoData: videoA });
    const iframe = screen.getByTitle(videoA.title);
    expect(iframe).toHaveAttribute("src", videoA.url);
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderVideo({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderVideo();
    expect(result.container).toMatchSnapshot();
  });
});

const renderVideo = createTestRender(Video, {
  videoData: videoA,
});
