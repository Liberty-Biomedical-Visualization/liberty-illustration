import isUndefined from "./isUndefined";

const environmentVariableNames = [
  "CONTENTFUL_ACCESS_TOKEN",
  "CONTENTFUL_ASSET_CDN_HOSTNAME",
  "CONTENTFUL_ENVIRONMENT",
  "CONTENTFUL_IMAGE_CDN_HOSTNAME",
  "CONTENTFUL_SPACE_ID",
] as const;

const entries = environmentVariableNames.map(
  (key) => [key, process.env[key]] as const,
);

assertEntriesValuesAreDefined(entries);
const config = Object.fromEntries(entries) as Config;
type Config = Readonly<{ [key in EnvironmentVariableName]: string }>;
type EnvironmentVariableName = (typeof environmentVariableNames)[number];
export default config;

function assertEntriesValuesAreDefined<K, V>(
  entries: readonly (readonly [K, V | undefined])[],
): asserts entries is (readonly [K, V])[] {
  const entriesWithUndefinedValue = entries.filter((entry) =>
    isUndefined(entry[1]),
  );

  if (entriesWithUndefinedValue.length > 0) {
    const undefinedKeys = entriesWithUndefinedValue
      .map(([key]) => "\t" + key)
      .join("\n");

    const message =
      "the following environment variables are undefined:\n" + undefinedKeys;

    throw new Error(message);
  }
}
