import type { Metadata } from "next";

import Gallery from "@/components/Gallery";
import * as content from "@/lib/content";
import describeGallery from "@/lib/describeGallery";

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
