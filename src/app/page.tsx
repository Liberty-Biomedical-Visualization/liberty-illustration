import Carousel from "@/components/Carousel";
import * as content from "@/lib/content";

export default async function Home() {
  const configuration = await content.getJsonByTitle("Home Configuration");
  const { carouselImageGalleryId, slideDuration } = configuration;
  const imageGallery = await content.getImageGallery(carouselImageGalleryId);

  const siteData = await content.getJsonByTitle("Site Metadata");
  const describedImages = imageGallery.images.map((image) =>
    describeImage(image, siteData.author),
  );

  return (
    <Carousel
      className="h-64 lg:h-192 sm:h-128 xs:h-72"
      images={describedImages}
      slideDuration={slideDuration}
      transitionDuration={1_000}
    />
  );
}

function describeImage(image: content.ImageData, author: string) {
  const describedImage = { ...image };
  describedImage.description ??= `An illustration by ${author}.`;
  return describedImage;
}
