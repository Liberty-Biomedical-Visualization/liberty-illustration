import { describe, expect, it } from "@jest/globals";

import getPromiseState from "./getPromiseState";

describe("getPromiseState", () => {
  it("should return resolved when passed a resolved Promise", async () => {
    const promise = Promise.resolve();
    const result = await getPromiseState(promise);
    expect(result).toBe("resolved");
  });

  it("should return unresolved when passed an unresolved Promise", async () => {
    const promise = new Promise(() => {});
    const result = await getPromiseState(promise);
    expect(result).toBe("unresolved");
  });

  it("should return rejected when passed a rejected Promise", async () => {
    const promise = Promise.reject();
    const result = await getPromiseState(promise);
    expect(result).toBe("rejected");
  });
});
