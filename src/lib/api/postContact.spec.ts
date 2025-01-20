import { describe, expect, it, jest } from "@jest/globals";

import postContact, {
  type PostContactErrorResult,
  type PostContactResult,
} from "./postContact";

describe("postContact", () => {
  it("should call fetch with body serialized as JSON", async () => {
    const response = new Response("", { status: 200 });
    const fetch = jest.fn(() => Promise.resolve(response));

    await postContact(body, fetch);

    expect(fetch).toHaveBeenCalledWith("/api/contact", {
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  });

  it("should return result with isOk true when response is OK", async () => {
    const response = new Response("", { status: 200 });
    const fetch = () => Promise.resolve(response);

    const result = await postContact(body, fetch);

    expect(result.isOk).toBe(true);
  });

  it("should return result with isOk false when response is not OK", async () => {
    const response = new Response("", { status: 500 });
    const fetch = () => Promise.resolve(response);

    const result = await postContact(body, fetch);

    expect(result.isOk).toBe(false);
  });

  it("should return result with JSON body of response as validation when response status is 422", async () => {
    const validation = {
      email: "Ridiculous",
      message: "Silly",
      subject: "Outrageous",
    };
    const response = new Response(JSON.stringify(validation), { status: 422 });
    const fetch = () => Promise.resolve(response);

    const result = await postContact(body, fetch);

    expect(result.isOk).toBe(false);
    assertIsPostContactErrorResult(result);
    expect(result.validation).toEqual(validation);
  });
});

const body = {
  email: "foo@bar.com",
  message: "Test message, please ignore.",
  subject: "Test Subject",
};

function assertIsPostContactErrorResult(
  result: PostContactResult,
): asserts result is PostContactErrorResult {
  if (result.isOk) {
    throw new Error("result is not PostContactErrorResult");
  }
}
