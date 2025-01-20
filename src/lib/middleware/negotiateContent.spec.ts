import { describe, expect, it } from "@jest/globals";

import negotiateContent, { ContentNegotiationError } from "./negotiateContent";

describe("negotiateContent", () => {
  it("should throw a ContentNegotiationError when Accept header is missing", async () => {
    const request = new Request("https://test.com");

    expect(() => negotiateContent(request)).toThrowError(
      ContentNegotiationError,
    );
  });

  it("should not throw when Accept header contains */*", async () => {
    const request = new Request("https://test.com", {
      headers: { Accept: "*/*" },
    });

    expect(() => negotiateContent(request)).not.toThrow();
  });

  it("should not throw when Accept header contains application/*", async () => {
    const request = new Request("https://test.com", {
      headers: { Accept: "application/*" },
    });

    expect(() => negotiateContent(request)).not.toThrow();
  });

  it("should not throw when Accept header contains application/json", async () => {
    const request = new Request("https://test.com", {
      headers: { Accept: "application/json" },
    });

    expect(() => negotiateContent(request)).not.toThrow();
  });

  it("should not throw when Accept header contains mixed acceptable and unacceptable content", async () => {
    const request = new Request("https://test.com", {
      headers: { Accept: "application/json,text/plain" },
    });

    expect(() => negotiateContent(request)).not.toThrow();
  });

  it("should throw a ContentNegotiationError when Accept header is not acceptable", async () => {
    const request = new Request("https://test.com", {
      headers: { Accept: "text/plain" },
    });

    expect(() => negotiateContent(request)).toThrowError(
      ContentNegotiationError,
    );
  });
});
