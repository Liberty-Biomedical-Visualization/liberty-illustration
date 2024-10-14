/**
 * Returns the state of passed promise.
 */
export default async function getPromiseState(promise: Promise<unknown>) {
  try {
    const winner = await Promise.race([promise, sentinel]);
    return winner === sentinel ? "unresolved" : "resolved";
  } catch {
    return "rejected";
  }
}

const sentinel = {};
