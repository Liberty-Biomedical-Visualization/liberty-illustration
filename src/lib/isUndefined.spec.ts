import { describe, expect, it } from "@jest/globals";

import isUndefined from "./isUndefined";

describe("isUndefined", () => {
  it("should return true when value is undefined", () => {
    const value = undefined;
    const result = isUndefined(value);
    expect(result).toBe(true);
  });

  it("should return false when value is not undefined", () => {
    const value = "foo";
    const result = isUndefined(value);
    expect(result).toBe(false);
  });
});
