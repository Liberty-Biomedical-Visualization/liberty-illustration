import { describe, expect, it } from "@jest/globals";

import resolveClassNames from "./resolveClassNames";

describe("resolveClassNames", () => {
  it("should return an empty className when passed no classNames", () => {
    const result = resolveClassNames();
    expect(result).toBe("");
  });

  it("should return an empty className when passed undefined", () => {
    const result = resolveClassNames(undefined);
    expect(result).toBe("");
  });

  it("should return passed className when passed one className", () => {
    const result = resolveClassNames("bar");
    expect(result).toBe("bar");
  });

  it("should return a joined className when passed multiple distinct classNames", () => {
    const classNameA = "bar";
    const classNameB = "foo";
    const result = resolveClassNames(classNameA, classNameB);
    expect(result).toBe(`${classNameA} ${classNameB}`);
  });

  it("should return a lexicographically-sorted className when passed an unsorted className", () => {
    const result = resolveClassNames("baz foo bar");
    expect(result).toBe("bar baz foo");
  });

  it("should return a className without duplication when passed duplicate classNames", () => {
    const result = resolveClassNames("bar foo bar bar");
    expect(result).toBe("bar foo");
  });

  it("should return a joined, lexicographically-sorted className when passed multiple unsorted classNames", () => {
    const result = resolveClassNames("foo", "bar");
    expect(result).toBe("bar foo");
  });

  it("should return a className when passed empty classNames", () => {
    const classNameA = "foo bar baz";
    const classNameB = "";
    const classNameC = "fizz buzz";
    const result = resolveClassNames(classNameA, classNameB, classNameC);
    expect(result).toBe("bar baz buzz fizz foo");
  });

  it("should return a className without extra whitespace passed a className that is whitespace", () => {
    const classNameA = "foo bar baz";
    const classNameB = " ";
    const classNameC = "fizz buzz";
    const result = resolveClassNames(classNameA, classNameB, classNameC);
    expect(result).toBe("bar baz buzz fizz foo");
  });

  it("should return a className without extra whitespace when passed classNames containing extra whitespace", () => {
    const classNameA = "    foo        bar    baz ";
    const classNameB = " fizz   buzz   ";
    const result = resolveClassNames(classNameA, classNameB);
    expect(result).toBe("bar baz buzz fizz foo");
  });

  it("should return a valid className when passed valid classNames and undefined", () => {
    const classNameA = "foo bar baz";
    const classNameB = undefined;
    const classNameC = "fizz buzz";
    const result = resolveClassNames(classNameA, classNameB, classNameC);
    expect(result).toBe("bar baz buzz fizz foo");
  });
});
