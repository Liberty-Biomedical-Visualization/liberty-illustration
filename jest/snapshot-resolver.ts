const snapshotResolver = {
  resolveSnapshotPath(testPath: string, snapshotExtension: string) {
    return testPath + snapshotExtension;
  },

  resolveTestPath(snapshotFilepath: string, snapshotExtension: string) {
    return snapshotFilepath.replace(snapshotExtension, "");
  },

  testPathForConsistencyCheck: "some/path/example.spec.ts",
};

export default snapshotResolver;
