import { describe, expect, it } from "@jest/globals";

import getPromiseState from "./getPromiseState";
import wait from "./wait";

describe("wait", () => {
  const duration = 1_000;

  it("should return an unresolved Promise", async () => {
    const promise = wait(duration);
    const state = await getPromiseState(promise);
    expect(state).toBe("unresolved");
  });

  it("should resolve returned Promise after passed duration", async () => {
    const promise = wait(duration);
    await wait(duration);
    const state = await getPromiseState(promise);
    expect(state).toBe("resolved");
  });
});
