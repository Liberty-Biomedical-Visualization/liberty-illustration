/**
 * Durations expressed in milliseconds that are supported by tailwindcss class
 * names.
 */
export type TransitionDuration = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1_000;

/**
 * Dictionary of transition durations and corresponding tailwindcss class names.
 *
 * Tailwindcss needs to be able to read complete class names at compile time to
 * generate appropriate CSS. Partial string interpolation will not work.
 */
export const transitionDurationClassNames = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1_000: "duration-1000",
} as const;
