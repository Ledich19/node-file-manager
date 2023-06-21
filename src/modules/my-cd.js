import path from "node:path";
import { mkdir, access, copyFile, readdir, stat } from "node:fs/promises";

const up = (workingDir) => {
  return path.dirname(workingDir);
};

const cd = async (workingDir, inputPath) => {
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  try {
    await stat(newPath);
    return newPath;
  } catch {
    throw Error("error", error);
  }
};

export default { up, cd };
