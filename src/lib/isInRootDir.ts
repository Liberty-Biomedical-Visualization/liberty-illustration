export default function isInRootDir(path: string) {
  return path.lastIndexOf("/") === 0;
}
