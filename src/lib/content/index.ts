import * as contentful from "contentful";

import packageData from "../../../package.json";
import config from "../config";
import isDefined from "../isDefined";
import { Json, JsonTitle } from "./jsonConfiguration";
import { validateJson } from "./validateJson";

/**
 * Gets `ImageData` by ID.
 *
 * Throws an `Error` if the image is not found, or the asset is not an image.
 */
export async function getImageData(id: string) {
  const asset = await client.getAsset(id);
  return mapAssetToImage(asset);
}

export interface ImageData {
  description?: string;
  height: number;
  src: string;
  title?: string;
  width: number;
}

/**
 * Gets an `ImageGallery` by ID.
 *
 * Throws an `Error` if the gallery is not found.
 */
export async function getImageGallery(id: string) {
  const entry = await client.getEntry<ImageGallerySkeleton>(id);
  return mapEntryToImageGallery(entry);
}

export interface ImageGallery {
  images: ImageData[];
  title: string;
}

/**
 * Gets a `JsonReference` by title.
 *
 * Throws an error if the JSON is not found.
 */
export async function getJsonByTitle<K extends JsonTitle>(title: K) {
  const jsons = await client.getEntries<JsonSkeleton<Json<K>>>({
    content_type: "json",
    "fields.title": title,
  });
  const json = jsons.items[0];

  if (json === undefined) {
    throw new Error(`JSON with title "${title}" not found`);
  }

  validateJson(json.fields.value, title);
  return json.fields.value;
}

function mapAssetToImage(asset: ImageAsset) {
  const { description, file, title } = asset.fields;

  if (file === undefined) {
    throw new Error("file is undefined");
  }

  const { image } = file.details;

  if (image === undefined) {
    throw new Error("image is undefined");
  }

  const { height, width } = image;
  const imageData: ImageData = { height, src: "https:" + file.url, width };

  if (description) {
    imageData.description = description;
  }

  if (title) {
    imageData.title = title;
  }

  return imageData;
}

type ImageAsset = contentful.Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;

function mapEntryToImageGallery(entry: ImageGalleryEntry) {
  const { images, title } = entry.fields;
  const mappedImages = images.filter(isDefined).map(mapAssetToImage);
  const gallery: ImageGallery = { images: mappedImages, title };
  return gallery;
}

type ImageGalleryEntry = contentful.Entry<
  ImageGallerySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;

interface ImageGallerySkeleton {
  contentTypeId: "imageGallery";
  fields: {
    images: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.AssetLink>;
    title: contentful.EntryFieldTypes.Text;
  };
}

interface JsonSkeleton<T extends JsonReference> {
  contentTypeId: "json";
  fields: {
    value: contentful.EntryFieldTypes.Object<T>;
    title: contentful.EntryFieldTypes.Text;
  };
}

type JsonReference = JsonArray | JsonObject;
type JsonArray = JsonValue[];
type JsonObject = { [key: string]: JsonValue };
type JsonValue = JsonArray | JsonObject | boolean | null | number | string;

const { dependencies, name, version } = packageData;

const client = contentful.createClient({
  accessToken: config.CONTENTFUL_ACCESS_TOKEN,
  application: `${name}/${version}`,
  environment: config.CONTENTFUL_ENVIRONMENT,
  integration: `next/${dependencies.next}`,
  space: config.CONTENTFUL_SPACE_ID,
}).withoutUnresolvableLinks;
