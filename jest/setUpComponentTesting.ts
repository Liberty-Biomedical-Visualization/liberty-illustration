import childProcess from "child_process";
import util from "util";

import { tailwindInputPath, tailwindOutputPath } from "./config";

const exec = util.promisify(childProcess.exec);

export default async function setUpComponentTesting() {
  await exec(
    `npx tailwindcss -i ${tailwindInputPath} -o ${tailwindOutputPath}`,
  );
}
