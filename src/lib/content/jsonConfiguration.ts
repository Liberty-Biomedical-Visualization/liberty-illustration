/**
 * Expected structure of JSON entries in Contentful.
 */
export const jsonConfiguration = {
  "Home Configuration": {
    carouselImageGalleryId: "string",
  },
  "Integration Test JSON": {
    foo: "string",
  },
  "Invalid Integration Test JSON": {
    fizz: "string[]",
    foo: "string",
    zip: "string[]",
  },
  "Site Configuration": {
    amiLogoId: "string",
    cmiLogoId: "string",
    siteLogoId: "string",
  },
  "Site Metadata": {
    author: "string",
    description: "string",
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

// Prettier will mangle the ternary expressions in this type and make it
// difficult to understand.
// prettier-ignore
type StringLiteralAsType<T> = 
  T extends "string" ? string :
  T extends "string[]" ? string[] :
  never;
