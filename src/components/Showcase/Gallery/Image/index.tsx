import Image from "next/image";
import { useId } from "react";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

export default function GalleryImage(props: Readonly<GalleryImageProps>) {
  const { imageData, onClick } = props;
  const { description, height, src, title, width } = imageData;

  const className = resolveClassNames(
    "overflow-hidden relative",
    props.className,
  );

  const captionId = useId();
  const titleContent = description ? `${title}:` : title;

  const descriptionContent = title ? (
    <>
      <br />
      {description}
    </>
  ) : (
    description
  );

  const caption = (
    <figcaption className={figcaptionClassName} id={captionId}>
      <p className={pClassName}>
        {title && <span className="sm:text-lg text-sm">{titleContent}</span>}
        {description && descriptionContent}
      </p>
    </figcaption>
  );

  const captionShouldBeShown = description || title;

  return (
    <button className={className} onClick={onClick}>
      {/* Chrome does not recognize figcaption as the name of figure. */}
      <figure aria-labelledby={captionId}>
        <Image
          alt={description ?? ""}
          className="aspect-square object-scale-down"
          height={height}
          src={src}
          title={title}
          width={width}
        />
        {captionShouldBeShown ? caption : <div className={shroudClassName} />}
      </figure>
    </button>
  );
}

export interface GalleryImageProps {
  className?: string;
  imageData: ImageData;
  onClick: () => void;
}

const figcaptionClassName =
  "absolute inset-0 active:bg-accent-200/50 hover:bg-accent-50/50 transition sm:active:bg-background/90 sm:hover:bg-background/80";

const pClassName =
  "absolute inset-0 opacity-0 p-2 sm:hover:opacity-100 text-left transition";

const shroudClassName =
  "absolute inset-0 active:bg-accent-200/50 hover:bg-accent-50/50 transition";
