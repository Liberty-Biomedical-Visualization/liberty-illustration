import { type ImageGallery } from "@/lib/content";

import type { OnImageClick } from "..";
import GalleryImage from "./Image";

export default function Gallery(props: Readonly<GalleryProps>) {
  const { className, gallery, onImageClick } = props;
  const { images, title } = gallery;
  const thumbnails = images.map(transformToThumbnail);
  const galleryImages = thumbnails.map((imageData, index) =>
    transformToGalleryImage(imageData, index, onImageClick),
  );

  return (
    <section className={className}>
      <h2 className="text-2xl">{title}</h2>
      <div className={gridClassName}>{galleryImages}</div>
    </section>
  );
}

export interface GalleryProps {
  className?: string;
  gallery: Readonly<ImageGallery>;
  onImageClick: OnImageClick;
}

function transformToGalleryImage(
  imageData: ImageGallery["images"][number],
  index: number,
  onImageClick: (imageIndex: number) => void,
) {
  const handleClick = () => onImageClick(index);

  return (
    <GalleryImage imageData={imageData} key={index} onClick={handleClick} />
  );
}

function transformToThumbnail(imageData: ImageGallery["images"][number]) {
  return { ...imageData, height: THUMBNAIL_SIZE, width: THUMBNAIL_SIZE };
}

const THUMBNAIL_SIZE = 256;

const gridClassName =
  "2xl:grid-cols-[repeat(6,minmax(0,256px))] gap-4 grid grid-cols-[repeat(3,minmax(0,256px))] lg:grid-cols-[repeat(4,minmax(0,256px))] max-w-fit xl:grid-cols-[repeat(5,minmax(0,256px))]";
