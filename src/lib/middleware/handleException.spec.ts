import { describe, expect, it } from "@jest/globals";

import handleException from "./handleException";
import { ContentNegotiationError } from "./negotiateContent";

describe("handleException", () => {
  it("should return a 406 Response when exception is a ContentNegotiationError", async () => {
    const clientMessage = "Only application/json is supported.";
    const exception = new ContentNegotiationError(
      `Accept header is foo`,
      clientMessage,
    );

    const result = handleException(exception);

    expect(result.status).toBe(406);
    expect(result.statusText).toBe("Not Acceptable");
    await expect(result.text()).resolves.toBe(clientMessage);
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
