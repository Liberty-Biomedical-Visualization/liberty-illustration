import { describe, expect, it } from "@jest/globals";

import parseJsonBody, { ParseJsonBodyError } from "./parseJsonBody";

describe("parseJsonBody", () => {
  it("should resolve to parsed request body content", async () => {
    const content = { foo: "bar" };
    const request = new Request("https://test.com", {
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const result = await parseJsonBody(request);

    expect(result).toEqual(content);
  });

  it("should reject to a ParseJsonBodyError when Content-Type is not application/json", async () => {
    const request = new Request("https://test.com", {
      body: JSON.stringify({ foo: "bar" }),
      headers: { "Content-Type": "text/plain" },
      method: "POST",
    });

    await expect(() => parseJsonBody(request)).rejects.toThrowError(
      ParseJsonBodyError,
    );
  });

  it("should reject to a ParseJsonBodyError when request body is not valid JSON", async () => {
    const request = new Request("https://test.com", {
      body: "{ foo",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    await expect(() => parseJsonBody(request)).rejects.toThrowError(
      ParseJsonBodyError,
    );
  });
});
