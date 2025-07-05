/**
 * Expected structure of JSON entries in Contentful.
 */
export const jsonConfiguration = {
  "Home Configuration": {
    carouselImageGalleryId: "string",
    slideDuration: "number",
  },
  "Integration Test JSON": {
    foo: "string",
  },
  "Invalid Integration Test JSON": {
    fizz: "string[]",
    foo: "string",
    zip: "string[]",
  },
  "Medical Illustration Configuration": {
    imageGalleryId: "string",
  },
  "Portfolio Configuration": {
    imageGalleryIds: "string[]",
  },
  "Site Configuration": {
    amiLogoId: "string",
    cmiLogoId: "string",
    copyrightYear: "number",
    navPageOrder: "string[]",
    siteLogoId: "string",
  },
  "Site Metadata": {
    author: "string",
    description: "string",
    faviconId: "string",
    keywords: "string[]",
    locale: "string",
    name: "string",
    url: "string",
  },
} as const;

export type JsonTitle = keyof JsonConfiguration;
type JsonConfiguration = typeof jsonConfiguration;

export type Json<K extends JsonTitle> = StringLiteralPropertiesAsTypes<
  JsonConfiguration[K]
>;

type StringLiteralPropertiesAsTypes<T extends JsonConfiguration[JsonTitle]> = {
  [K in keyof T]: StringLiteralAsType<T[K]>;
};

type StringLiteralAsType<T> = T extends ConfigurableType
  ? ConfigurableTypeMap[T]
  : never;

type ConfigurableType = keyof ConfigurableTypeMap;

type ConfigurableTypeMap = {
  number: number;
  string: string;
  "string[]": string[];
};
