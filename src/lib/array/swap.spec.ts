import { describe, expect, it } from "@jest/globals";

import swap from "./swap";

describe("swap", () => {
  it("should swap items in the array when both indices are non-negative and in range", () => {
    const array = ["a", "b", "c"];

    swap(array, 0, 1);

    const expected = ["b", "a", "c"];
    expect(array).toEqual(expected);
  });

  it("should throw a RangeError when the array is empty", () => {
    const array: unknown[] = [];
    expect(() => swap(array, 0, 0)).toThrowError(RangeError);
  });

  it("should do nothing when the array has one item and both indices are 0", () => {
    const array = ["a"];

    swap(array, 0, 0);

    const expected = ["a"];
    expect(array).toEqual(expected);
  });

  it("should do nothing when the array has multiple items and indexA and indexB are equal", () => {
    const array = ["a", "b", "c"];
    const indexA = 0;
    const indexB = indexA;

    swap(array, indexA, indexB);

    const expected = ["a", "b", "c"];
    expect(array).toEqual(expected);
  });

  it("should throw a RangeError when indexA less than 0", () => {
    const array = ["a", "b", "c"];
    const indexA = 0 - 1;
    expect(() => swap(array, indexA, 0)).toThrowError(RangeError);
  });

  it("should throw a RangeError when indexA is equal to the array length", () => {
    const array = ["a", "b", "c"];
    const indexA = array.length;
    expect(() => swap(array, indexA, 0)).toThrowError(RangeError);
  });

  it("should throw a RangeError when indexA is greater than the array length", () => {
    const array = ["a", "b", "c"];
    const indexA = array.length + 1;
    expect(() => swap(array, indexA, 0)).toThrowError(RangeError);
  });

  it("should throw a RangeError when indexB less than 0", () => {
    const array = ["a", "b", "c"];
    const indexB = 0 - 1;
    expect(() => swap(array, 0, indexB)).toThrowError(RangeError);
  });

  it("should throw a RangeError when indexB is equal to the array length", () => {
    const array = ["a", "b", "c"];
    const indexB = array.length;
    expect(() => swap(array, 0, indexB)).toThrowError(RangeError);
  });

  it("should throw a RangeError when indexB is greater than the array length", () => {
    const array = ["a", "b", "c"];
    const indexB = array.length + 1;
    expect(() => swap(array, 0, indexB)).toThrowError(RangeError);
  });
});
