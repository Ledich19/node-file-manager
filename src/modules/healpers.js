import path from "node:path";

export const createPath = async (workingDir, inputPath) => {
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  return newPath;
};

