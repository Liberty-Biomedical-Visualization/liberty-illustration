/**
 * Returns the value of calling `Array.at` for the given index of array.
 *
 * Throws a `RangeError` if the index is out of bounds.
 */
export default function atChecked<T>(array: readonly T[], index: number) {
  const value = array.at(index);

  if (value === undefined) {
    throw new RangeError(`${index} is out of bounds`);
  }

  return value;
}
