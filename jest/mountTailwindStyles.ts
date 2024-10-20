import fs from "fs";

import { tailwindOutputPath } from "./config";

const style = document.createElement("style");
style.innerHTML = fs.readFileSync(tailwindOutputPath, "utf8");
document.head.appendChild(style);
