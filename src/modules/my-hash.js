import { readFile } from "node:fs/promises";
const { createHash } = await import("node:crypto");
import path from "path";
import { createPath } from "./healpers";

const calculateHash = async (workingDir,pathToFile) => {
  const filePath = createPath(workingDir,pathToFile)
  const hash = createHash("sha256");
  try {
    const contents = await readFile(filePath);
    await hash.update(contents);
    console.log(
      `\u001B[35m${`${hash.digest("hex")} \u001B[42m${path.basename(
        filePath.pathname
      )}`}\u001B[0m`
    );
  } catch (err) {
    throw Error(`\u001B[31mHASH operation failed\u001B[0m ${err.message}`);
  }
};

export default { calculateHash };
