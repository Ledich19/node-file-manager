import { createBrotliDecompress} from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createPath } from "./healpers.js";
import path from "node:path";

const compress = async (workingDir, pathToFile, endPath) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const resultPath = await createPath(workingDir, endPath);
  const dirname = path.basename(currentPath);
  const newFilePath = path.join(resultPath,`${dirname}.br` );
  const brotli = BrotliCompress();
  const source = createReadStream(currentPath);
  const destination = createWriteStream(newFilePath);
  try {
    await pipeline(source, brotli, destination);
  } catch (error) {
    throw Error(`\u001B[31mZip operation failed\u001B[0m ${error.message}`);
  }
};

const decompress = async (workingDir, pathToFile, endPath) => {
  const currentPath = await createPath(workingDir, pathToFile);
  const resultPath = await createPath(workingDir, endPath);
  const basename = path.basename(currentPath)
  const newFilePath = path.join(resultPath, basename.slice(0, -3));
  const brotli = createBrotliDecompress();
  const source = createReadStream(currentPath);
  const destination = createWriteStream(newFilePath);

  try {
    await pipeline(source, brotli, destination);
  } catch (error) {
    throw Error(`\u001B[31mZip operation failed\u001B[0m ${error.message}`);
  }
};

export default {
  compress,
  decompress
};
