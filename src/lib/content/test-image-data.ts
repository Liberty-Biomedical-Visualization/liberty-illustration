import config from "../config";
import type { ImageData } from ".";

export const completeImage: Readonly<Required<ImageData>> = {
  description: "A complete image used for testing.",
  height: 100,
  src: "https://foo.com/complete.jpg",
  title: "Complete Image",
  width: 100,
};

export const describedImage: Readonly<ImageData & { description: string }> = {
  description: "A described image used for testing.",
  height: 100,
  src: "https://foo.com/described.jpg",
  width: 100,
};

export const imageA: Readonly<Required<ImageData>> = {
  description: "An image identified as A and used for testing.",
  height: 100,
  src: "https://foo.com/a.jpg",
  title: "Image A",
  width: 100,
};

export const imageB: Readonly<Required<ImageData>> = {
  description: "An image identified as B and used for testing.",
  height: 100,
  src: "https://foo.com/b.jpg",
  title: "Image B",
  width: 100,
};

export const imageC: Readonly<Required<ImageData>> = {
  description: "An image identified as C and used for testing.",
  height: 100,
  src: "https://foo.com/c.jpg",
  title: "Image C",
  width: 100,
};

export const integrationTestImage: Readonly<Required<ImageData>> = {
  description: "This is a dummy image used for integration testing.",
  height: 2_480,
  src: `https://${config.CONTENTFUL_IMAGE_CDN_HOSTNAME}/${config.CONTENTFUL_SPACE_ID}/7ci4trPV2FWGxweCTSVqol/b6e816c40b1cf429be48c82a0f73037c/test-image.png`,
  title: "Integration Test Image",
  width: 2_480,
};

export const longDescribedImage: Readonly<ImageData & { description: string }> =
  {
    description:
      "This Is An Image With An Exceedingly Long Description That Will Be Truncated When Converted to a Thumbnail Because It Is Longer Than the Maximum Character Count",
    height: 100,
    src: "https://foo.com/long-titled.jpg",
    width: 100,
  };

export const longTitledImage: Readonly<ImageData & { title: string }> = {
  height: 100,
  src: "https://foo.com/long-titled.jpg",
  title:
    "An Image With An Exceedingly Long Title That Will Be Truncated When Converted to a Thumbnail Because It Is Longer Than the Maximum Character Count",
  width: 100,
};

export const minimalImage: Readonly<ImageData> = {
  height: 100,
  src: "https://foo.com/minimal.jpg",
  width: 100,
};

export const nondescriptImage: Readonly<ImageData & { title: string }> = {
  height: 100,
  src: "https://foo.com/nondescript.jpg",
  title: "Nondescript Image",
  width: 100,
};

export const titledImage: Readonly<ImageData & { title: string }> = {
  height: 100,
  src: "https://foo.com/titled.jpg",
  title: "Titled Image",
  width: 100,
};

export const untitledImage: Readonly<ImageData & { description: string }> = {
  description: "An untitled image used for testing.",
  height: 100,
  src: "https://foo.com/untitled.jpg",
  width: 100,
};
