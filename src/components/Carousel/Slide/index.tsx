import Image from "next/image";

import resolveClassNames from "@/lib/resolveClassNames";

export default function CarouselSlide(props: Readonly<CarouselSlideProps>) {
  const { image } = props;

  const className = resolveClassNames(
    "flex items-center min-w-full px-2 w-full",
    props.className,
  );

  return (
    <div className={className}>
      <Image
        alt={image.description}
        className="max-h-full max-w-full mx-auto object-contain"
        height={image.height}
        src={image.src}
        title={image.title}
        width={image.width}
      />
    </div>
  );
}

export interface CarouselSlideProps {
  className?: string;
  image: ImageData;
}

interface ImageData {
  description: string;
  height: number;
  src: string;
  title: string;
  width: number;
}
