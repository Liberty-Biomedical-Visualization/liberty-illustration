import type { Config } from "jest";
import nextJest from "next/jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/!(*.spec|*.test).ts?(x)",
    "!<rootDir>/src/app/**",
    "!<rootDir>/src/page-object-models/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  passWithNoTests: true,
  projects: [
    "<rootDir>/jest.component.config.ts",
    "<rootDir>/jest.integration.config.ts",
    "<rootDir>/jest.unit.config.ts",
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig(config);
