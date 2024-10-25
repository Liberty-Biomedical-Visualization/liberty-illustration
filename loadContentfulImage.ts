import type { ImageLoaderProps } from "next/image";

export default function loadContentfulImage(props: ImageLoaderProps) {
  const { quality, src, width } = props;

  // @TODO: Remove. All images should come from Contentful.
  if (src.startsWith("/_next/")) {
    return src;
  }

  const url = new URL(src);
  url.searchParams.set("fm", "webp");
  url.searchParams.set("q", (quality ?? 75).toString());
  url.searchParams.set("w", width.toString());
  return url.href;
}
