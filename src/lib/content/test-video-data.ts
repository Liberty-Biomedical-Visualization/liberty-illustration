import type { VideoData } from ".";

export const videoA: Readonly<Required<VideoData>> = {
  title: "Video A",
  url: "https://www.youtube.com/embed/a",
};

export const videoB: Readonly<Required<VideoData>> = {
  title: "Video B",
  url: "https://www.youtube.com/embed/b",
};

export const videoC: Readonly<Required<VideoData>> = {
  title: "Video C",
  url: "https://www.youtube.com/embed/c",
};

export const integrationTestVideo: Readonly<VideoData> = {
  title: "Integration Test Video",
  url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
};
