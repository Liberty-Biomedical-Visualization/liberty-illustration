import fs from "fs/promises";

import { tailwindOutputPath } from "./config";

export default async function tearDownComponentTesting() {
  await fs.rm(tailwindOutputPath);
}
