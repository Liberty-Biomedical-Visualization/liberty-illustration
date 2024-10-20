import { describe, expect, it } from "@jest/globals";

import atChecked from "./atChecked";

describe("atChecked", () => {
  const a = "a";
  const b = "b";
  const c = "c";
  const array = [a, b, c];

  it("should return the first item in the array when index is 0", () => {
    const index = 0;
    const result = atChecked(array, index);
    expect(result).toBe(a);
  });

  it("should return the item at the given index in the array when index is between 0 and array length", () => {
    const index = 1;
    expect(index).toBeGreaterThan(0);
    expect(index).toBeLessThan(array.length);
    const result = atChecked(array, index);
    expect(result).toBe(b);
  });

  it("should throw a RangeError when index is equal to array length", () => {
    const index = array.length;
    expect(() => atChecked(array, index)).toThrowError(RangeError);
  });

  it("should throw a RangeError when index is greater than array length", () => {
    const index = array.length + 1;
    expect(() => atChecked(array, index)).toThrowError(RangeError);
  });

  it("should return the last item in array when index is -1", () => {
    const index = -1;
    const result = atChecked(array, index);
    expect(result).toBe(c);
  });

  it("should return item relative to the end of the array when index is between negated array length and 0", () => {
    const index = -2;
    expect(index).toBeGreaterThan(-array.length);
    expect(index).toBeLessThan(0);
    const result = atChecked(array, index);
    expect(result).toBe(b);
  });

  it("should return first item in array when index is equal to negated array length", () => {
    const index = -array.length;
    const result = atChecked(array, index);
    expect(result).toBe(a);
  });

  it("should throw a RangeError when index is less than negated array length", () => {
    const index = -array.length - 1;
    expect(() => atChecked(array, index)).toThrowError(RangeError);
  });
});
