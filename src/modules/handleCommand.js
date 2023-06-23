import myCd from "./my-cd.js";
import myLs from "./my-ls.js";
import myFs from "./my-fss.js";
import myOs from "./my-os.js";
import myHash from "./my-hash.js";
import myBrotli from "./my-brotli.js";
import os from "node:os";
import { splitString } from "./healpers.js";

export let workingDir = os.homedir();

const handleCommand = async (input) => {
  const args = splitString(input);

  const command = args[0];
  switch (true) {
    case command === "up":
      workingDir = myCd.up(workingDir);
      break;
    case command === "cd" && args.length === 2:
      workingDir = await myCd.cd(workingDir, args[1]);
      break;
    case command === "ls":
      await myLs.ls(workingDir);
      break;
    case command === "cat" && args.length === 2:
      await myFs.cat(workingDir, args[1]);
      break;
    case command === "add" && args.length === 2:
      await myFs.add(workingDir, args[1]);
      break;
    case command === "rn" && args.length === 3:
      myFs.rn(workingDir, args[1], args[2]);
      break;
    case command === "cp" && args.length === 3:
      await myFs.cp(workingDir, args[1], args[2]);
      break;
    case command === "mv" && args.length === 3:
      await myFs.mv(workingDir, args[1], args[2]);
      break;
    case command === "rm" && args.length === 2:
      await myFs.rmf(workingDir, args[1]);
      break;
    case command === "os" && args.length === 2:
      myOs.osi(args[1]);
      break;
    case command === "hash" && args.length === 2:
      await myHash.calculateHash(workingDir, args[1]);
      break;
    case command === "compress" && args.length === 3:
      await myBrotli.compress(workingDir, args[1], args[2]);
      break;
    case command === "decompress" && args.length === 3:
      await myBrotli.decompress(workingDir, args[1], args[2]);
      break;
    default:
      console.error(`\u001B[31m Invalid input \u001B[0m`);
      break;
  }
};

export default handleCommand;
