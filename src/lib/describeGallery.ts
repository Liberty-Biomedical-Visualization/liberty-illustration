import type { ImageData, ImageGallery } from "./content";

/**
 * Adds default titles and descriptions to images in `gallery` if they are
 * missing.
 */
export default function describeGallery(gallery: ImageGallery, author: string) {
  const describedGallery: ImageGallery = { ...gallery };
  const describedImages = gallery.images.map((image) =>
    describeImage(image, author),
  );
  describedGallery.images = describedImages;
  return describedGallery;
}

function describeImage(image: ImageData, author: string) {
  const describedImage: ImageData = { ...image };
  describedImage.description ??= `An illustration by ${author}.`;
  describedImage.title ??= "Untitled";
  return describedImage;
}
