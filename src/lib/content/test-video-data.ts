import type { VideoData } from ".";

export const videoA: Readonly<Required<VideoData>> = {
  title: "Video A",
  url: "https://www.youtube.com/embed/a",
};

export const integrationTestVideo: Readonly<VideoData> = {
  title: "Integration Test Video",
  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};
