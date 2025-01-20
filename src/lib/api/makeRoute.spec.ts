import { describe, expect, it } from "@jest/globals";
import { z, ZodError } from "zod";

import makeRoute from "./makeRoute";

describe("makeRoute", () => {
  it("should return a function that resolves to a Response", async () => {
    const route = makeRoute({
      handleRequest: () => Promise.resolve(),
      method: "POST",
      parseBody: () => Promise.resolve({}),
      schema: z.object({}),
    });
    const request = new Request("https://test.com");

    const result = await route(request);

    expect(result).toBeInstanceOf(Response);
  });

  it("should return a function that resolves to a Response when handleRequest rejects", async () => {
    const route = makeRoute({
      handleRequest: () => Promise.reject(),
      method: "POST",
      parseBody: () => Promise.resolve(),
      schema: z.object({}),
    });
    const request = new Request("https://test.com");

    const result = await route(request);

    expect(result).toBeInstanceOf(Response);
  });

  it("should return a function that resolves to a Response when parseBody rejects", async () => {
    const route = makeRoute({
      handleRequest: () => Promise.resolve(),
      method: "POST",
      parseBody: () => Promise.reject(),
      schema: z.object({}),
    });
    const request = new Request("https://test.com");

    const result = await route(request);

    expect(result).toBeInstanceOf(Response);
  });

  it("should return a function that resolves to a Response when schema.parse throws a ZodError", async () => {
    const schema = z.object({});
    schema.parse = () => {
      throw new ZodError([]);
    };
    const route = makeRoute({
      handleRequest: () => Promise.resolve(),
      method: "POST",
      parseBody: () => Promise.reject(),
      schema,
    });
    const request = new Request("https://test.com");

    const result = await route(request);

    expect(result).toBeInstanceOf(Response);
  });
});
