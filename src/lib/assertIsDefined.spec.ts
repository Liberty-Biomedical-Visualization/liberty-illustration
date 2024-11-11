import { describe, expect, it } from "@jest/globals";

import assertIsDefined from "./assertIsDefined";

describe("assertIsDefined", () => {
  it("should throw Error when value is undefined", () => {
    const value = undefined;
    expect(() => assertIsDefined(value)).toThrowError();
  });

  it("should not throw Error when value is defined", () => {
    const value = "foo";
    expect(() => assertIsDefined(value)).not.toThrowError();
  });
});
