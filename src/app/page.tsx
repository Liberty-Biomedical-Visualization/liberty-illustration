import Carousel from "@/components/Carousel";
import * as content from "@/lib/content";

export default async function Home() {
  const configuration = await content.getJsonByTitle("Home Configuration");
  const { carouselImageGalleryId, slideDuration } = configuration;
  const imageGallery = await content.getImageGallery(carouselImageGalleryId);

  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const describedImages = imageGallery.images.map((image) =>
    describeImage(image, siteMetadata.author),
  );

  return (
    <Carousel
      className="h-[50vh]"
      images={describedImages}
      slideDuration={slideDuration}
      transitionDuration={1_000}
    />
  );
}

function describeImage(image: content.ImageData, author: string) {
  const describedImage: content.ImageData = { ...image };
  describedImage.description ??= `An illustration by ${author}.`;
  return describedImage;
}
