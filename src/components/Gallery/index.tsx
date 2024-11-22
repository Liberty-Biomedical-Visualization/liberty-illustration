"use client";

import { useState } from "react";

import { type ImageGallery } from "@/lib/content";

import Thumbnail, { type ThumbnailProps } from "./Thumbnail";

export default function Gallery(props: Readonly<GalleryProps>) {
  const { className, gallery } = props;
  const { images, title } = gallery;
  const [, setSelectedImageIndex] = useState<number | null>(null);
  const thumbnails = images.map((imageData, index) =>
    transformToThumbnail(imageData, index, setSelectedImageIndex),
  );

  return (
    <section className={className}>
      <h2 className="text-2xl">{title}</h2>
      <div className={gridClassName}>{thumbnails}</div>
    </section>
  );
}

export interface GalleryProps {
  className?: string;
  gallery: Readonly<ImageGallery>;
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
