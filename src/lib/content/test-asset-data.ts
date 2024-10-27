import config from "../config";
import { AssetData } from ".";

export const integrationTestAsset: Readonly<Required<AssetData>> = {
  description: "This is a PDF used for integration testing.",
  title: "Integration Test PDF",
  url: `https://${config.CONTENTFUL_ASSET_CDN_HOSTNAME}/${config.CONTENTFUL_SPACE_ID}/1eKUknoC6JiemY6AWJ9cz9/142a354214d6443e643422fe0e2a6a99/test-pdf.pdf`,
};
