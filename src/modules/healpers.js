import path from "node:path";
import { access } from "node:fs/promises";

export const createPath = async (workingDir, inputPath) => {
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  try {
    await access(newPath);
    return newPath;
  } catch {
    console.log("Path dose'nt exist");
  }
};
