import { describe, expect, it } from "@jest/globals";

import { integrationTestAsset } from "./test-asset-data";
import { integrationTestImage } from "./test-image-data";
import { integrationTestVideo } from "./test-video-data";
import * as content from ".";

describe("content", () => {
  describe("getAssetData", () => {
    it("should resolve to asset data", async () => {
      /**
       * `Asset` titled "Integration Test PDF".
       */
      const id = "1eKUknoC6JiemY6AWJ9cz9";
      const result = content.getAssetData(id);
      await expect(result).resolves.toEqual(integrationTestAsset);
    });

    it("should reject when the asset is not found", async () => {
      const id = "n0t4r3a1iD";
      const result = content.getAssetData(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getImageData", () => {
    it("should resolve to image data", async () => {
      /**
       * `Asset` titled "Integration Test Image".
       */
      const id = "7ci4trPV2FWGxweCTSVqol";
      const result = content.getImageData(id);
      await expect(result).resolves.toEqual(integrationTestImage);
    });

    it("should reject when the image is not found", async () => {
      const id = "n0t4r3a1iD";
      const result = content.getImageData(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });

    it("should reject when the asset is not an image", async () => {
      /**
       * `Asset` titled "Integration Test PDF".
       */
      const id = "1eKUknoC6JiemY6AWJ9cz9";
      const result = content.getImageData(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getImageGallery", () => {
    it("should resolve to an image gallery", async () => {
      /**
       * `ImageGallery` titled "Integration Test Gallery".
       */
      const id = "3JcWtiLjG0QyV4YkweMLAV";
      const result = content.getImageGallery(id);
      const expected: content.ImageGallery = {
        images: [
          integrationTestImage,
          integrationTestImage,
          integrationTestImage,
        ],
        title: "Integration Test Gallery",
      };
      await expect(result).resolves.toEqual(expected);
    });

    it("should reject when the image gallery is not found", async () => {
      const id = "n0t4r3a1iD";
      const result = content.getImageGallery(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });

    it("should reject when the entry is not an image gallery", async () => {
      /**
       * `JSON` titled "Integration Test JSON".
       */
      const id = "4XVQ4uT86oNKYqp9VQZ7XZ";
      const result = content.getImageGallery(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getJsonByTitle", () => {
    it("should resolve to a JSON object", async () => {
      const title = "Integration Test JSON";
      const result = content.getJsonByTitle(title);
      const expected = { foo: "bar" };
      await expect(result).resolves.toEqual(expected);
    });

    it("should reject when the JSON object is not found", async () => {
      const title = "n0t4r3a1t1t1e";
      const result = content.getJsonByTitle(title as "Integration Test JSON");
      await expect(result).rejects.toBeInstanceOf(Error);
    });

    it("should reject when the JSON object is not properly structured", async () => {
      const title = "Invalid Integration Test JSON";
      const result = content.getJsonByTitle(title);
      await expect(result).rejects.toBeInstanceOf(Error);
    });

    it("should reject when the entry is not a JSON object", async () => {
      const title = "Integration Test Gallery";
      const result = content.getJsonByTitle(title as "Integration Test JSON");
      await expect(result).rejects.toBeInstanceOf(Error);
    });
  });

  describe("getVideoGallery", () => {
    it("should resolve to an video gallery", async () => {
      /**
       * `VideoGallery` titled "Integration Test Video Gallery".
       */
      const id = "5LtD1WTR1k1jPi3XjmVksw";
      const result = content.getVideoGallery(id);
      const expected: content.VideoGallery = {
        title: "Integration Test Video Gallery",
        videos: [
          integrationTestVideo,
          integrationTestVideo,
          integrationTestVideo,
        ],
      };
      await expect(result).resolves.toEqual(expected);
    });

    it("should reject when the video gallery is not found", async () => {
      const id = "n0t4r3a1iD";
      const result = content.getVideoGallery(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });

    it("should reject when the entry is not an image gallery", async () => {
      /**
       * `JSON` titled "Integration Test JSON".
       */
      const id = "4XVQ4uT86oNKYqp9VQZ7XZ";
      const result = content.getVideoGallery(id);
      await expect(result).rejects.toBeInstanceOf(Error);
    });
  });
});
