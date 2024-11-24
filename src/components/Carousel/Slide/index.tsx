import Image from "next/image";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

export default function CarouselSlide(props: Readonly<CarouselSlideProps>) {
  const { imageData } = props;
  const { description, height, src, title, width } = imageData;

  const className = resolveClassNames(
    "flex flex-col items-center sm:justify-center max-h-screen min-w-full sm:px-2 w-full",
    props.className,
  );

  return (
    <div className={className}>
      <Image
        alt={description ?? ""}
        className="h-auto max-h-full max-w-full mx-auto object-contain w-auto"
        height={height}
        src={src}
        title={title}
        width={width}
      />
    </div>
  );
}

export interface CarouselSlideProps {
  className?: string;
  imageData: ImageData;
}
