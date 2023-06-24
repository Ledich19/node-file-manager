import { createReadStream, createWriteStream } from "node:fs";
import { access, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createPath } from "./healpers.js";

const cat = async (workingDir, filePath) => {
  const newFilePath = await createPath(workingDir, filePath);
  const readStream = createReadStream(newFilePath);

  await new Promise((resolve, reject) => {
    readStream.on("data", (chunk) => {
      process.stdout.write(`${chunk.toString()}\n`);
    });
    readStream.on("error", (error) => {
      reject(error);
    });
    readStream.on("end", () => {
      resolve();
    });
  });
};

const add = async (workingDir, newFileName) => {
  const newFilePath = path.join(workingDir, newFileName);
  await writeFile(newFilePath, "", { flag: "wx" });
};

const rn = async (workingDir, pathToFile, newFilename) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const dirname = path.dirname(currentPath);
  const newFilePath = path.join(dirname, newFilename);
  await access(currentPath);
  rename(currentPath, newFilePath);
};

const rmf = async (workingDir, pathToFile) => {
  const newPathToFile = await createPath(workingDir, pathToFile);
  await rm(newPathToFile);
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
