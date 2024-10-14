import type { Config } from "jest";
import nextJest from "next/jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts?(x)"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  globalSetup: "<rootDir>/jest/global-setup.ts",
  globalTeardown: "<rootDir>/jest/global-teardown.ts",
  passWithNoTests: true,
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest/setup.ts"],
  snapshotResolver: "<rootDir>/jest/snapshot-resolver.ts",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.ts?(x)"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig(config);
