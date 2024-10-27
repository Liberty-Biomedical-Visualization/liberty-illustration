import type { Config } from "@jest/types";
import nextJest from "next/jest";

const config: Config.InitialProjectOptions = {
  clearMocks: true,
  displayName: { color: "cyan", name: "UNIT" },
  globalSetup: "<rootDir>/jest/setUpComponentTesting.ts",
  globalTeardown: "<rootDir>/jest/tearDownComponentTesting.ts",
  preset: "ts-jest",
  setupFilesAfterEnv: [
    "<rootDir>/jest/mountJestDomGlobals.ts",
    "<rootDir>/jest/mountTailwindStyles.ts",
  ],
  snapshotResolver: "<rootDir>/jest/snapshot-resolver.ts",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.tsx"],
  testPathIgnorePatterns: ["<rootDir>/src/app/"],
};

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig(config);
