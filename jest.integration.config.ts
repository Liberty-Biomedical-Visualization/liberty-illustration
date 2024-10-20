import type { Config } from "@jest/types";
import nextJest from "next/jest";

const config: Config.InitialProjectOptions = {
  clearMocks: true,
  displayName: { color: "magenta", name: "INTEGRATION" },
  preset: "ts-jest",
  snapshotResolver: "<rootDir>/jest/snapshot-resolver.ts",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig(config);
