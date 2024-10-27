import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <Carousel
      className="h-64 lg:h-192 mx-4 sm:h-128 xs:h-72"
      images={[]}
      slideDuration={5_000}
      transitionDuration={1_000}
    />
  );
}
