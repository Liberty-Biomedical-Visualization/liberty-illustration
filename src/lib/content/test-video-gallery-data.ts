import { videoA, videoB, videoC } from "./test-video-data";
import type { VideoGallery } from ".";

export const completeVideoGallery: Readonly<VideoGallery> = {
  videos: [videoA, videoB, videoC],
  title: "Complete Video Gallery",
};

export const minimalVideoGallery: Readonly<VideoGallery> = {
  videos: [],
  title: "Minimal Video Gallery",
};
