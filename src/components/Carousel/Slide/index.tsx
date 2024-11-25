import Image from "next/image";
import { useId } from "react";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

export default function CarouselSlide(props: Readonly<CarouselSlideProps>) {
  const { imageData, showCaption } = props;
  const { description, height, src, title, width } = imageData;

  const captionId = useId();

  const className = resolveClassNames(
    "flex flex-col items-center sm:justify-center max-h-screen min-w-full px-2 w-full",
    props.className,
  );

  const imageClassName = resolveClassNames(
    "max-w-full mx-auto object-contain w-auto",
    showCaption ? "max-h-[75%]" : "max-h-full my-auto",
  );

  const hasDescriptionOrTitle = !!(description || title);

  const descriptionContent = title ? (
    <>
      <br />
      {description}
    </>
  ) : (
    description
  );

  const titleContent = <span className="font-bold text-lg">{title}</span>;

  return (
    <figure
      aria-labelledby={showCaption ? captionId : undefined}
      className={className}
    >
      <Image
        alt={description ?? ""}
        className={imageClassName}
        height={height}
        src={src}
        title={title}
        width={width}
      />
      {showCaption && hasDescriptionOrTitle && (
        <figcaption className="mt-4 overflow-y-auto" id={captionId}>
          {/* Design explicitly wants this body of text to be centered. */}
          <p className="max-w-prose mx-auto text-background text-center">
            {title && titleContent}
            {description && descriptionContent}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

export interface CarouselSlideProps {
  className?: string;
  imageData: ImageData;
  showCaption?: boolean;
}
