import type { Metadata } from "next";

import Gallery from "@/components/Gallery";
import PageHeading from "@/components/PageHeading";
import * as content from "@/lib/content";
import describeGallery from "@/lib/describeGallery";

export default async function MedicalIllustration() {
  const configuration = await content.getJsonByTitle(
    "Medical Illustration Configuration",
  );
  const { imageGalleryId } = configuration;
  const imageGallery = await content.getImageGallery(imageGalleryId);
  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const describedGallery = describeGallery(imageGallery, siteMetadata.author);

  return (
    <section>
      <PageHeading className="mb-4">Medical Illustration</PageHeading>
      <Gallery
        gallery={describedGallery}
        lightboxImageTransitionDuration={1_000}
        lightboxVisibilityTransitionDuration={500}
      />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Medical Illustration",
};
