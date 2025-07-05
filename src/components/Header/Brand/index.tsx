import Image from "next/image";

import type { ImageData } from "@/lib/content";

export default function Brand(props: BrandProps) {
  const { className, logoData } = props;
  const { description, height, src, title, width } = logoData;

  return (
    <div className={className}>
      <Image
        alt={description ?? ""}
        className="max-w-3/4 mx-auto"
        height={height}
        src={src}
        title={title}
        priority
        width={width}
      />
      <h1 className="font-light sm:text-3xl text-2xl text-center text-nowrap">
        Abigail Richbourg Liberty, MS, CMI
      </h1>
    </div>
  );
}

export interface BrandProps {
  className?: string;
  logoData: ImageData;
}
