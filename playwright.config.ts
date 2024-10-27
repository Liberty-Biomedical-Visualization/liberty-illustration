import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "galaxy",
      use: { ...devices["Galaxy S8"] },
    },
    {
      name: "iphone",
      use: { ...devices["iPhone 15"] },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: "html",
  retries: process.env.CI ? 2 : 0,
  testDir: "./src/app",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start",
    reuseExistingServer: !process.env.CI || !!process.env.E2E_DEPLOYMENT,
    url: process.env.E2E_BASE_URL ?? "http://localhost:3000",
  },
};

if (process.env.CI) {
  config.workers = 1;
}

export default defineConfig(config);
