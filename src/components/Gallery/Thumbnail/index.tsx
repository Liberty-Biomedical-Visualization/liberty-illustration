import Image from "next/image";
import { useId } from "react";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";
import truncateText from "@/lib/truncateText";

export default function Thumbnail(props: Readonly<ThumbnailProps>) {
  const { imageData, onClick } = props;
  const { description, title } = imageData;
  const thumbnailImageData = transformToThumbnail(imageData);

  const {
    description: thumbnailDescription,
    height,
    src,
    title: thumbnailTitle,
    width,
  } = thumbnailImageData;

  const className = resolveClassNames(
    "overflow-hidden relative",
    props.className,
  );

  const captionId = useId();
  const titleContent = description ? `${thumbnailTitle}:` : thumbnailTitle;

  const descriptionContent = title ? (
    <>
      <br />
      {thumbnailDescription}
    </>
  ) : (
    thumbnailDescription
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

export interface ThumbnailProps {
  className?: string;
  imageData: Readonly<ImageData>;
  onClick: () => void;
}

/**
 * Maximum count of combined title and description characters before truncation.
 */
export const CAPTION_CHARACTER_LIMIT = 128;

function transformToThumbnail(image: Readonly<ImageData>): ImageData {
  const thumbnail: ImageData = {
    height: THUMBNAIL_SIZE,
    src: image.src,
    width: THUMBNAIL_SIZE,
  };

  let charactersRemaining = CAPTION_CHARACTER_LIMIT;

  for (const key of TEXT_KEYS) {
    const text = image[key];

    if (text && charactersRemaining > 0) {
      const truncatedText = truncateText(text, charactersRemaining);
      thumbnail[key] = truncatedText;
      charactersRemaining -= text.length;
    }
  }

  return thumbnail;
}

const TEXT_KEYS = ["title", "description"] as const;
const THUMBNAIL_SIZE = 256;

const figcaptionClassName =
  "absolute inset-0 active:bg-accent-200/50 hover:bg-accent-50/50 transition sm:active:bg-background/90 sm:hover:bg-background/80";

const pClassName =
  "absolute inset-0 opacity-0 p-2 sm:hover:opacity-100 text-left transition";

const shroudClassName =
  "absolute inset-0 active:bg-accent-200/50 hover:bg-accent-50/50 transition";
