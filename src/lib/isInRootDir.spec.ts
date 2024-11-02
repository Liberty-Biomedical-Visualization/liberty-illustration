import { describe, expect, it } from "@jest/globals";

import isInRootDir from "./isInRootDir";

describe("isInRootDir", () => {
  it("should return true when path is the root directory", () => {
    const path = "/";
    const result = isInRootDir(path);
    expect(result).toBe(true);
  });

  it("should return true when path contains no subdirectories", () => {
    const path = "/foo";
    const result = isInRootDir(path);
    expect(result).toBe(true);
  });

  it("should return false when path contains a subdirectory", () => {
    const path = "/foo/bar";
    const result = isInRootDir(path);
    expect(result).toBe(false);
  });

  it("should return false when path is relative", () => {
    const path = "./foo";
    const result = isInRootDir(path);
    expect(result).toBe(false);
  });

  it("should return false when path contains no segment separators", () => {
    const path = "foo";
    const result = isInRootDir(path);
    expect(result).toBe(false);
  });
});
