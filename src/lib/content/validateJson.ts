import { jsonConfiguration, type JsonTitle } from "./jsonConfiguration";

/**
 * Validates that a Contentful JSON entry is properly structured.
 */
export function validateJson(json: Record<string, unknown>, key: JsonTitle) {
  const configuration = jsonConfiguration[key];
  const entries = Object.entries(configuration);
  const errors = [];

  for (const [key, expectedType] of entries) {
    const value = json[key];
    const valueType = typeof value;

    switch (expectedType) {
      case "string":
        if (valueType !== "string") {
          errors.push(`${key} must be a string`);
        }

        break;

      case "string[]":
        if (
          !Array.isArray(value) ||
          value.some((item) => typeof item !== "string")
        ) {
          errors.push(`${key} must be an array of strings`);
        }

        break;

      default:
        const unhandledType: never = expectedType;
        throw new Error(`unhandled JSON value type: ${unhandledType}`);
    }
  }

  if (errors.length > 0) {
    const stringifiedErrors = errors.map((error) => "\t" + error).join("\n");
    throw new Error(`${key} failed validation:\n` + stringifiedErrors);
  }
}
