import Image from "next/image";

import type { ImageData } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

export default function AmiMember(props: Readonly<AmiMemberProps>) {
  const { logoData } = props;
  const { description, height, src, title, width } = logoData;
  const className = resolveClassNames(
    "h-12 object-contain w-auto",
    props.className,
  );

  return (
    <Image
      alt={description ?? "Association of Medical Illustrators member."}
      className={className}
      height={height}
      src={src}
      title={title}
      width={width}
    />
  );
}

export interface AmiMemberProps {
  className?: string;
  logoData: ImageData;
}
