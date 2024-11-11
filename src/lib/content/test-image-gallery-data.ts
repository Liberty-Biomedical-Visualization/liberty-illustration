import { imageA, imageB, imageC } from "./test-image-data";
import { ImageGallery } from ".";

export const completeImageGallery: Readonly<ImageGallery> = {
  images: [imageA, imageB, imageC],
  title: "Minimal Image Gallery",
};

export const minimalImageGallery: Readonly<ImageGallery> = {
  images: [],
  title: "Minimal Image Gallery",
};
