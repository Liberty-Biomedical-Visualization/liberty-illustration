import path from "path";

import { MetadataRoute } from "next";

import * as content from "@/lib/content";
import isUppercase from "@/lib/isUppercase";

export default async function manifest() {
  const siteData = await content.getJsonByTitle("Site Metadata");
  const { description, keywords, name, url } = siteData;
  const shortName = deriveShortName(name);

  const siteConfiguration = await content.getJsonByTitle("Site Configuration");
  const logoData = await content.getImageData(siteConfiguration.siteLogoId);
  const logoExtension = path.extname(logoData.src).replace(".", "");

  const manifest: MetadataRoute.Manifest = {
    background_color: "#fff",
    categories: keywords,
    description,
    display: "browser",
    icons: [
      {
        sizes: "any",
        src: logoData.src,
        type: `image/${logoExtension}`,
      },
    ],
    id: url,
    name,
    short_name: shortName,
    start_url: "/",
    theme_color: "#0398ce",
  };

  return manifest;
}

function deriveShortName(name: string) {
  return name
    .split("")
    .map((character) => character.trim())
    .filter((character) => !!character)
    .filter(isUppercase)
    .join("");
}
