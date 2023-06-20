import { createReadStream, createWriteStream } from "node:fs";
import { open } from "fs/promises";
import {
  access,
  readdir,
  rename,
  unlink,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const createPath = async (workingDir, inputPath) => {
  //console.log('----', workingDir, inputPath);
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

const cat = async (workingDir, filePath) => {
  const newFilePath = await createPath(workingDir, filePath);
  const readStream = createReadStream(newFilePath);
  readStream.on("data", (chunk) => {
    process.stdout.write(`${chunk.toString()}\n`);
  });
  readStream.on("end", () => {});
};

const add = async (workingDir, newFileName) => {
  const newFilePath = path.join(workingDir, newFileName);
  console.log("newFilePath ADD:", newFilePath);
  try {
    const promise = writeFile(newFilePath, "", { flag: "wx" });
    await promise;
  } catch (err) {
    throw Error(`\u001B[31mFS operation failed\u001B[0m ${err.message}`);
  }
};

const rn = async (workingDir, pathToFile, newFilename) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const dirname = path.dirname(currentPath);
  const newFilePath = path.join(dirname, newFilename);

  try {
    try {
      await access(newPath);
      throw Error(`\u001B[31mFS operation failed\u001B[0m ${err.message}`);
    } catch {}
    await access(pathToFile);
    rename(currentPath, newFilePath);
  } catch (err) {
    throw Error(`\u001B[31mFS operation failed\u001B[0m ${err.message}`);
  }
};

const rmf = async (workingDir, pathToFile) => {
  const newPathToFile = path.resolve(workingDir, pathToFile);
  try {
    await rm(newPathToFile);
  } catch (err) {
    throw Error(`\u001B[31mFS operation failed\u001B[0m ${err.message}`);
  }
};

const cp = async (workingDir, pathToFile, pathToNewDirectory) => {
  const newPathToFile = await createPath(workingDir, pathToFile);
  const pathToNewDir = await createPath(workingDir, pathToNewDirectory);
  const pathWithName = path.resolve(pathToNewDir, path.basename(newPathToFile));

  const readStream = createReadStream(newPathToFile);
  const writeStream = createWriteStream(pathWithName);
  readStream.pipe(writeStream);
  writeStream.on("finish", () => {
    console.log(`File copied successfully.`);
  });
};

const mv = async (workingDir, pathToFile, pathToNewDirectory) => {
  const newPathToFile = await createPath(workingDir, pathToFile);
  const pathToNewDir = await createPath(workingDir, pathToNewDirectory);
  const pathWithName = path.resolve(pathToNewDir, path.basename(newPathToFile));

  const readStream = createReadStream(newPathToFile);
  const writeStream = createWriteStream(pathWithName);

  readStream.pipe(writeStream);
  writeStream.on("finish", () => {
    console.log(`File ${"name"} moved successfully.`);
    rm(newPathToFile);
  });
};

export default {
  cat,
  add,
  rn,
  cp,
  mv,
  rmf,
};
