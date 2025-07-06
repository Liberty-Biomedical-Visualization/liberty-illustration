import { VideoData } from "@/lib/content";
import { useId } from "react";

export default function Video(props: Readonly<VideoProps>) {
  const { title, url } = props.videoData;

  const captionId = useId();

  return (
    <figure aria-labelledby={captionId} className={props.className}>
      <figcaption className="mb-2 sm:text-2xl text-xl" id={captionId}>
        {title}
      </figcaption>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
        referrerPolicy="strict-origin-when-cross-origin"
        src={url}
        title={title}
      />
    </figure>
  );
}

export interface VideoProps {
  className?: string;
  videoData: Readonly<VideoData>;
}
