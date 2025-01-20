import { describe, expect, it } from "@jest/globals";
import { ZodError } from "zod";

import handleException from "./handleException";
import { ParseJsonBodyError } from "./parseJsonBody";

describe("handleException", () => {
  it("should return a 415 Response when exception is a ParseJsonBodyError", () => {
    const exception = new ParseJsonBodyError();

    const result = handleException(exception);

    expect(result.status).toBe(415);
    expect(result.statusText).toBe("Unsupported Media Type");
  });

  it("should return a 422 Response when exception is a ZodError", () => {
    const exception = new ZodError([]);

    const result = handleException(exception);

    expect(result.status).toBe(422);
    expect(result.statusText).toBe("Unprocessable Content");
  });

  it("should return a Response with issues formatted as JSON when exception is a ZodError with issues", async () => {
    const exception = new ZodError([
      { code: "custom", path: ["foo"], message: "must be a string" },
      { code: "custom", path: ["foo"], message: "is not baz" },
      { code: "custom", path: ["fizz"], message: "is buzz" },
    ]);

    const result = handleException(exception);

    await expect(result.json()).resolves.toEqual({
      fizz: "is buzz",
      foo: "must be a string; is not baz",
    });
  });

  it("should return a 500 Response when exception is a general Error", () => {
    const exception = new Error();

    const result = handleException(exception);

    expect(result.status).toBe(500);
    expect(result.statusText).toBe("Internal Server Error");
  });

  it("should return a 500 Response when exception is not an Error", () => {
    const exception = "foo";

    const result = handleException(exception);

    expect(result.status).toBe(500);
    expect(result.statusText).toBe("Internal Server Error");
  });
});
