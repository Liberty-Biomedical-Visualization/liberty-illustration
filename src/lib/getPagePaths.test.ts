import fs from "fs";
import path from "path";

import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";

import getPagePaths from "./getPagePaths";

describe("getPagePaths", () => {
  beforeAll(setUpFakeAppDir);

  it("should return an array containing paths to all directories that contain a page.tsx file for the given dirPath", () => {
    const result = getPagePaths(appDirPath);
    const expected = ["/", "/contact", "/contact/success", "/portfolio"];
    expect(result.sort()).toEqual(expected.sort());
  });

  afterAll(tearDownFakeAppDir);
});

let appDirPath: string;

function setUpFakeAppDir() {
  appDirPath = fs.mkdtempSync("getPagePaths");

  const contactPath = path.join(appDirPath, "contact");
  const contactSuccessPath = path.join(contactPath, "success");
  const portfolioPath = path.join(appDirPath, "portfolio");
  const dirPaths = [contactPath, contactSuccessPath, portfolioPath];
  dirPaths.forEach((dirPath) => fs.mkdirSync(dirPath, { recursive: true }));

  const homePagePath = path.join(appDirPath, "page.tsx");
  const rootLayoutPath = path.join(appDirPath, "layout.tsx");
  const contactPagePath = path.join(contactPath, "page.tsx");
  const contactSuccessPagePath = path.join(contactSuccessPath, "page.tsx");
  const portfolioPagePath = path.join(portfolioPath, "page.tsx");
  const filePaths = [
    homePagePath,
    rootLayoutPath,
    contactPagePath,
    contactSuccessPagePath,
    portfolioPagePath,
  ];
  filePaths.forEach((filePath) => fs.writeFileSync(filePath, ""));
}

function tearDownFakeAppDir() {
  fs.rmSync(appDirPath, { force: true, recursive: true });
}
