import { describe, expect, it } from "@jest/globals";

import isDefined from "./isDefined";

describe("isDefined", () => {
  it("should return true when value is not undefined", () => {
    const value = "foo";
    const result = isDefined(value);
    expect(result).toBe(true);
  });

  it("should return false when value is undefined", () => {
    const value = undefined;
    const result = isDefined(value);
    expect(result).toBe(false);
  });
});
