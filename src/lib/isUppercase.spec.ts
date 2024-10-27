import { describe, expect, it } from "@jest/globals";

import isUppercase from "./isUppercase";

describe("isUppercase", () => {
  it("should return true when passed value is uppercase", () => {
    const result = isUppercase("FOO");
    expect(result).toBe(true);
  });

  it("should return false when passed value is lowercase", () => {
    const result = isUppercase("foo");
    expect(result).toBe(false);
  });

  it("should return false when passed value is mixed-case", () => {
    const result = isUppercase("FoO");
    expect(result).toBe(false);
  });
});
