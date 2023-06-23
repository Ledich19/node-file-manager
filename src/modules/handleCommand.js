import myCd from "./my-cd.js";
import myLs from "./my-ls.js";
import myFs from "./my-fss.js";
import myOs from "./my-os.js";
import myHash from "./my-hash.js";
import myBrotli from "./my-brotli.js";
import os from "node:os";
import { splitString } from "./healpers.js";
import { INVALID_INPUT } from "./constants.js";

export let workingDir = os.homedir();

const handleCommand = async (input) => {
  const args = splitString(input);
  const command = args[0];
  const argsLen = args.length;

  switch (true) {
    case command === "up":
      workingDir = myCd.up(workingDir);
      break;
    case command === "cd" && argsLen === 2:
      workingDir = await myCd.cd(workingDir, args[1]);
      break;
    case command === "ls":
      await myLs.ls(workingDir);
      break;
    case command === "cat" && argsLen === 2:
      await myFs.cat(workingDir, args[1]);
      break;
    case command === "add" && argsLen === 2:
      await myFs.add(workingDir, args[1]);
      break;
    case command === "rn" && argsLen === 3:
      myFs.rn(workingDir, args[1], args[2]);
      break;
    case command === "cp" && argsLen === 3:
      await myFs.cp(workingDir, args[1], args[2]);
      break;
    case command === "mv" && argsLen === 3:
      await myFs.mv(workingDir, args[1], args[2]);
      break;
    case command === "rm" && argsLen === 2:
      await myFs.rmf(workingDir, args[1]);
      break;
    case command === "os" && argsLen === 2:
      myOs.osi(args[1]);
      break;
    case command === "hash" && argsLen === 2:
      await myHash.calculateHash(workingDir, args[1]);
      break;
    case command === "compress" && argsLen === 3:
      await myBrotli.compress(workingDir, args[1], args[2]);
      break;
    case command === "decompress" && argsLen === 3:
      await myBrotli.decompress(workingDir, args[1], args[2]);
      break;
    default:
      console.error(INVALID_INPUT);
      break;
  }
};

export default handleCommand;
