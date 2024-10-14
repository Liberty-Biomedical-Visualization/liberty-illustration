import fs from "fs";

import "@testing-library/jest-dom/jest-globals";

import { tailwindOutputPath } from "./setup-and-teardown-config";

mountTailwindStyles();

function mountTailwindStyles() {
  const style = document.createElement("style");
  style.innerHTML = fs.readFileSync(tailwindOutputPath, "utf8");
  document.head.appendChild(style);
}
