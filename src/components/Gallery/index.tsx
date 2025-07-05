"use client";

import { useState } from "react";

import { type ImageGallery } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

import Lightbox, { type LightboxProps } from "./Lightbox";
import Thumbnail, { type ThumbnailProps } from "./Thumbnail";

export default function Gallery(props: Readonly<GalleryProps>) {
  const {
    disableTabbableDisplayCheck,
    gallery,
    lightboxImageTransitionDuration,
    lightboxVisibilityTransitionDuration,
  } = props;

  const { images } = gallery;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const thumbnails = images.map((imageData, index) =>
    transformToThumbnail(imageData, index, setSelectedImageIndex),
  );

  const lightboxIsShown = selectedImageIndex !== null;
  const handleLightboxClose = () => setSelectedImageIndex(null);
  const className = resolveClassNames(props.className, gridClassName);

  return (
    <>
      {lightboxIsShown && (
        <Lightbox
          disableTabbableDisplayCheck={!!disableTabbableDisplayCheck}
          imageIndex={selectedImageIndex}
          images={images}
          imageTransitionDuration={lightboxImageTransitionDuration}
          onClose={handleLightboxClose}
          visibilityTransitionDuration={lightboxVisibilityTransitionDuration}
        />
      )}
      <div className={className}>{thumbnails}</div>
    </>
  );
}

export interface GalleryProps {
  className?: string;
  disableTabbableDisplayCheck?: LightboxProps["disableTabbableDisplayCheck"];
  gallery: Readonly<ImageGallery>;
  lightboxImageTransitionDuration: LightboxProps["imageTransitionDuration"];
  lightboxVisibilityTransitionDuration: LightboxProps["visibilityTransitionDuration"];
}

function transformToThumbnail(
  imageData: ThumbnailProps["imageData"],
  index: number,
  onThumbnailClick: (index: number) => void,
) {
  const handleClick = () => onThumbnailClick(index);
  return <Thumbnail imageData={imageData} key={index} onClick={handleClick} />;
}

const gridClassName =
  "2xl:grid-cols-[repeat(6,minmax(0,256px))] gap-4 grid grid-cols-[repeat(3,minmax(0,256px))] lg:grid-cols-[repeat(4,minmax(0,256px))] max-w-fit xl:grid-cols-[repeat(5,minmax(0,256px))]";
