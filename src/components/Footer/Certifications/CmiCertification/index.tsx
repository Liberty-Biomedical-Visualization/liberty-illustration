import Image from "next/image";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

export default function CmiCertification(
  props: Readonly<CmiCertificationProps>,
) {
  const { logoData } = props;
  const { description, src, title } = logoData;
  const className = resolveClassNames("flex items-center", props.className);

  return (
    <div className={className}>
      <Image
        alt={
          description ?? "CMI, Board of Certification of Medical Illustrators."
        }
        className="h-12 object-contain w-auto"
        height={imageSize}
        src={src}
        title={title}
        width={imageSize}
      />
      <p className="flex-shrink-0 leading-none ml-1">
        <span className="font-bold text-nowrap uppercase">
          Board Certified <br />
          Medical Illustrator{" "}
        </span>
        <br />
        <span className="leading-none text-nowrap text-xs">
          by the Board of Certification of Medical Illustrators
        </span>
      </p>
    </div>
  );
}

export interface CmiCertificationProps {
  className?: string;
  logoData: ImageData;
}

/**
 * Aligns with pixel height of rendered text in this component.
 *
 * Causes a sharper image to render due to the underlying file being more
 * appropriately sized.
 */
const imageSize = 48;
