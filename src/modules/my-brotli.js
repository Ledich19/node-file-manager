import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createPath } from "./healpers.js";
import path from "node:path";

const compress = async (workingDir, pathToFile, endPath) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const resultPath = await createPath(workingDir, endPath);
  const newFilePath = path.join(resultPath, `${path.basename(currentPath)}.br`);

  const brotli = createBrotliCompress();
  const source = createReadStream(currentPath);
  const destination = createWriteStream(newFilePath);

  await pipeline(source, brotli, destination);
};

const decompress = async (workingDir, pathToFile, endPath) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const resultPath = await createPath(workingDir, endPath);
  const basename = path.basename(currentPath);
  const newFilePath = path.join(resultPath, basename.slice(0, -3));

  const brotli = createBrotliDecompress();
  const source = createReadStream(currentPath);
  const destination = createWriteStream(newFilePath);

  await pipeline(source, brotli, destination);
};

export default {
  compress,
  decompress,
};
