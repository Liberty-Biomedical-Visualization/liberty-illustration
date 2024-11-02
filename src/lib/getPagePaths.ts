import fs, { type Dirent } from "fs";
import path from "path";

/**
 * Returns a list of page paths relative to `dirPath`.
 */
export default function getPagePaths(dirPath: string) {
  return fs
    .readdirSync(dirPath, readdirOptions)
    .filter(isPage)
    .map((dirent) => resolvePagePath(dirPath, dirent));
}

const readdirOptions: ReaddirSyncOptions = {
  recursive: true,
  withFileTypes: true,
};

type ReaddirSyncOptions = Parameters<typeof fs.readdirSync>[1];

function isPage(dirent: Dirent) {
  return dirent.isFile() && dirent.name === "page.tsx";
}

function resolvePagePath(rootPath: string, dirent: Dirent) {
  return "/" + path.relative(rootPath, dirent.parentPath);
}
