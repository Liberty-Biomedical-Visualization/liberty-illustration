import { describe, expect, it } from "@jest/globals";

import truncateText from "./truncateText";

describe("truncateText", () => {
  it("should return text when length of text equals characterLimit", () => {
    const text = "foo bar baz";
    const characterLimit = text.length;
    const result = truncateText(text, characterLimit);
    expect(result).toBe(text);
  });

  it("should return text when length of text is less than characterLimit", () => {
    const text = "foo bar baz";
    const characterLimit = text.length + 1;
    const result = truncateText(text, characterLimit);
    expect(result).toBe(text);
  });

  it("should return text when length of text equals characterLimit", () => {
    const text = "foo bar baz";
    const characterLimit = text.length;
    const result = truncateText(text, characterLimit);
    expect(result).toBe(text);
  });

  it('should return truncated text appended with " …" when length of text exceeds characterLimit', () => {
    const text = "foo bar baz";
    const characterLimit = text.length - 1;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("foo bar …");
  });

  it('should return "…" when length of first word of text exceeds characterLimit', () => {
    const firstWord = "foo";
    const text = `${firstWord} bar baz`;
    const characterLimit = firstWord.length - 1;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("…");
  });

  it('should return "…" when text has length and characterLimit is 0', () => {
    const text = "foo";
    const characterLimit = 0;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("…");
  });

  it('should return "" when text is "" and characterLimit is 0', () => {
    const text = "";
    const characterLimit = 0;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("");
  });

  it('should return "…" when text has length and characterLimit is negative', () => {
    const text = "foo";
    const characterLimit = -1;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("…");
  });

  it('should return "" when text is "" and characterLimit is negative', () => {
    const text = "";
    const characterLimit = -1;
    const result = truncateText(text, characterLimit);
    expect(result).toBe("");
  });
});
