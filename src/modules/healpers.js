import path from "node:path";
import {
  access,
  readdir,
  rename,
  unlink,
  rm,
  writeFile,
} from "node:fs/promises";

export const createPath = async (workingDir, inputPath) => {
  console.log('----', workingDir, inputPath);
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  try {
    console.log("newPath", newPath);
    await access(newPath);
    return newPath;
  } catch (error) {
    throw Error("Path dose'nt exist");
  }
};