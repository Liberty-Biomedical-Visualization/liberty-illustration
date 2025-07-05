import type { Metadata } from "next";

import Gallery from "@/components/Gallery";
import PageHeading from "@/components/PageHeading";

import * as content from "@/lib/content";
import describeGallery from "@/lib/describeGallery";

export default async function GraphicDesign() {
  const configuration = await content.getJsonByTitle("Design Configuration");
  const { imageGalleryId } = configuration;
  const imageGallery = await content.getImageGallery(imageGalleryId);
  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const describedGallery = describeGallery(imageGallery, siteMetadata.author);

  return (
    <section>
      <PageHeading className="mb-4">Design</PageHeading>
      <Gallery
        gallery={describedGallery}
        lightboxImageTransitionDuration={1_000}
        lightboxVisibilityTransitionDuration={500}
      />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Design",
};
