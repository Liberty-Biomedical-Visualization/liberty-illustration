/**
 * Resolves after the passed duration.
 */
export default function wait(duration: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, duration));
}
