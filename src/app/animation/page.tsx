import type { Metadata } from "next";

import PageHeading from "@/components/PageHeading";
import VideoGallery from "@/components/VideoGallery";
import * as content from "@/lib/content";

export default async function Animation() {
  const configuration = await content.getJsonByTitle("Animation Configuration");
  const { videoGalleryId } = configuration;
  const videoGallery = await content.getVideoGallery(videoGalleryId);

  return (
    <section>
      <PageHeading className="mb-4">Animation</PageHeading>
      <VideoGallery gallery={videoGallery} />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Animation",
};
