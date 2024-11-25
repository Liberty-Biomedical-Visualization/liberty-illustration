import type { Metadata } from "next";

import Gallery from "@/components/Gallery";
import * as content from "@/lib/content";

export default async function Portfolio() {
  const configuration = await content.getJsonByTitle("Portfolio Configuration");
  const { imageGalleryIds } = configuration;
  const imageGalleryRequests = imageGalleryIds.map(content.getImageGallery);
  const imageGalleries = await Promise.all(imageGalleryRequests);

  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const describedImageGalleries = imageGalleries.map((gallery) =>
    describeGallery(gallery, siteMetadata.author),
  );

  const galleries = describedImageGalleries.map((gallery, index) => {
    const className =
      index === describedImageGalleries.length - 1 ? "" : "mb-4";

    return (
      <Gallery
        className={className}
        gallery={gallery}
        key={index}
        lightboxImageTransitionDuration={1_000}
        lightboxVisibilityTransitionDuration={500}
      />
    );
  });

  return galleries;
}

export const metadata: Metadata = {
  title: "Portfolio",
};

function describeGallery(gallery: content.ImageGallery, author: string) {
  const describedGallery: content.ImageGallery = { ...gallery };
  const describedImages = gallery.images.map((image) =>
    describeImage(image, author),
  );
  describedGallery.images = describedImages;
  return describedGallery;
}

function describeImage(image: content.ImageData, author: string) {
  const describedImage: content.ImageData = { ...image };
  describedImage.description ??= `An illustration by ${author}.`;
  describedImage.title ??= "Untitled";
  return describedImage;
}
