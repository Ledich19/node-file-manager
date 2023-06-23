import { readdir } from "node:fs/promises";

const ls = async (workDirectory) => {
  const tableDir = [];
  const tableFile = [];

  const files = await readdir(workDirectory, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      tableDir.push({
        name: file.name,
        type: "dir",
      });
    }
    if (file.isFile()) {
      tableFile.push({
        name: file.name,
        type: "file",
      });
    }
  }

  console.table([
    ...tableDir.sort((a, b) => a.name - b.name),
    ...tableFile.sort((a, b) => a.name - b.name),
  ]);
};

export default { ls };
