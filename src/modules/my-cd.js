import path from "node:path";
import { mkdir, access, copyFile, readdir, stat } from "node:fs/promises";

const up = (workingDir) => {
  return path.dirname(workingDir);
};
const cd = async (workingDir, inputPath) => {
  // C:\Users\Aleksandr\AppData\Local
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  try {
    console.log("NP", newPath);
    await stat(newPath);
    console.log("true");
    return newPath;
  } catch (error) {
    throw Error("error", error);
  }
};

export default { up, cd };
