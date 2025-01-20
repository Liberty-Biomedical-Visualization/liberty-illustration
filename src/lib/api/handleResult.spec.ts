import { describe, expect, it } from "@jest/globals";

import handleResult from "./handleResult";

describe("handleResult", () => {
  it('should return a 204 Response when method is "POST" and result is undefined', () => {
    const result = undefined;
    const method = "POST";

    const response = handleResult(method, result);

    expect(response.status).toBe(204);
    expect(response.statusText).toBe("No Content");
  });

  it('should return a 200 Response when method is "POST" and result is anything else', () => {
    const result = "foo";
    const method = "POST";

    const response = handleResult(method, result);

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
  });
});
