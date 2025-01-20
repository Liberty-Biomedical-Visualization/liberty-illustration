import { describe, expect, it } from "@jest/globals";
import { NextRequest } from "next/server";

import { middleware } from "./middleware";

describe("middlware", () => {
  it("should return a 406 Response when Request accept header is missing", async () => {
    const request = new NextRequest("https://test.com");

    const response = middleware(request);

    expect(response.status).toBe(406);
    expect(response.statusText).toBe("Not Acceptable");
    await expect(response.text()).resolves.toBe("Accept header is missing.");
  });

  it("should return a 406 Response when Request accept header is not application/json", async () => {
    const request = new NextRequest("https://test.com", {
      headers: { Accept: "text/plain" },
    });

    const response = middleware(request);

    expect(response.status).toBe(406);
    expect(response.statusText).toBe("Not Acceptable");
    await expect(response.text()).resolves.toBe(
      "Only application/json is supported.",
    );
  });

  it("should not return a 406 Response when Request accept header is application/json", async () => {
    const request = new NextRequest("https://test.com", {
      headers: { Accept: "application/json" },
    });

    const response = middleware(request);

    expect(response.status).not.toBe(406);
    expect(response.statusText).not.toBe("Not Acceptable");
  });
});
