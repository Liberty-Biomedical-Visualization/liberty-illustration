import type { VideoGallery } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

import Video from "../Video";

export default function VideoGallery(props: Readonly<VideoGalleryProps>) {
  const { gallery } = props;

  const className = resolveClassNames(baseClassName, props.className);

  const videos = gallery.videos.map((videoData, index) => (
    <Video key={index} videoData={videoData} />
  ));

  return <div className={className}>{videos}</div>;
}

export interface VideoGalleryProps {
  className?: string;
  gallery: Readonly<VideoGallery>;
}

const baseClassName = "flex flex-col gap-4";
