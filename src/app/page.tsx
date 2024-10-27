import Carousel from "@/components/Carousel";
import * as content from "@/lib/content";

export default async function Home() {
  const configuration = await content.getJsonByTitle("Home Configuration");
  const { carouselImageGalleryId } = configuration;
  const imageGallery = await content.getImageGallery(carouselImageGalleryId);

  return (
    <Carousel
      className="h-64 lg:h-192 mx-4 sm:h-128 xs:h-72"
      images={imageGallery.images}
      slideDuration={5_000}
      transitionDuration={1_000}
    />
  );
}
