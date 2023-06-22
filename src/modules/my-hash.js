import { readFile } from "node:fs/promises";
const { createHash } = await import("node:crypto");
import path from "path";
import { createPath } from "./healpers.js";

const calculateHash = async (workingDir, pathToFile) => {
  const filePath = await createPath(workingDir, pathToFile);
  
  const hash = createHash("sha256");
;
  const contents = await readFile(filePath);

  await hash.update(contents);

  console.log(
    `\u001B[35m${`${hash.digest("hex")} \u001B[42m${path.basename(
      filePath
    )}`}\u001B[0m`
  );
};

export default { calculateHash };
