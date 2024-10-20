/**
 * Resolves passed classNames into a single, lexicographically-sorted className
 * with no duplication or extraneous whitespace.
 */
export default function resolveClassNames(
  ...classNames: (string | undefined)[]
) {
  const processedClassNames = classNames
    .flatMap((className) => className?.trim().split(" "))
    .filter(isDefinedAndNotEmpty);
  const uniqueClassNames = new Set(processedClassNames);
  return [...uniqueClassNames].sort().join(" ");
}

function isDefinedAndNotEmpty(value: string | undefined): value is string {
  return !!value;
}
