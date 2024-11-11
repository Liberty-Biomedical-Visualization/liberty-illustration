export default function assertIsDefined<T>(
  value: T | undefined,
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new Error("value is undefined");
  }
}
