/**
 * Swaps items at the given indices in place.
 *
 * Throws a `RangeError` if either index is out of bounds.
 */
export default function swap(array: unknown[], indexA: number, indexB: number) {
  if (indexA < 0 || indexA >= array.length) {
    throw new RangeError(`${indexA} is out of bounds`);
  }

  if (indexB < 0 || indexB >= array.length) {
    throw new RangeError(`${indexB} is out of bounds`);
  }

  const memo = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = memo;
}
