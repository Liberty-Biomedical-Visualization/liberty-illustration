import type { Config } from "jest";
import nextJest from "next/jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
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
