import path from "path";

export default {
  "*.{css,html,json,md,yml}": [buildFormatCheckCommand],
  "*.{js,jsx,ts,tsx}": [
    buildFormatCheckCommand,
    buildLintCommand,
    buildTypeCheckCommand,
  ],
};

function buildFormatCheckCommand(fileNames) {
  const fileNamesString = fileNames.join(" ");
  return `npm run format:check -- ${fileNamesString}`;
}

function buildLintCommand(fileNames) {
  const fileNamesString = fileNames
    .map((fileName) => path.relative(process.cwd(), fileName))
    .join(" --file ");
  return `npm run lint -- --file ${fileNamesString}`;
}

function buildTypeCheckCommand(fileNames) {
  const fileNamesString = fileNames.join(" ");
  return `npm run type-check -- ${fileNamesString}`;
}
