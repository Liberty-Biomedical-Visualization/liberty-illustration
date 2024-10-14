import childProcess from "child_process";
import util from "util";

import {
  tailwindInputPath,
  tailwindOutputPath,
} from "./setup-and-teardown-config";

const exec = util.promisify(childProcess.exec);

export default async function setUp() {
  await exec(
    `npx tailwindcss -i ${tailwindInputPath} -o ${tailwindOutputPath}`,
  );
}
