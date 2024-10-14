import fs from "fs/promises";

import { tailwindOutputPath } from "./setup-and-teardown-config";

export default async function tearDown() {
  await fs.rm(tailwindOutputPath);
}
