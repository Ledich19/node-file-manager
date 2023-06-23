import myCd from "./my-cd.js";
import myLs from "./my-ls.js";
import myFs from "./my-fss.js";
import myOs from "./my-os.js";
import myHash from "./my-hash.js";
import myBrotli from "./my-brotli.js";
import os from "node:os";
import { splitString } from "./healpers.js";

export let workingDir = os.homedir();

const commands = {
  up: (wd) => {
    workingDir = myCd.up(wd);
  },
  ls: myLs.ls,
  cd: async (wd, arg) => {
    workingDir = await myCd.cd(workingDir, arg);
  },
  cat: await myFs.cat,
  add: await myFs.add,
  rm: await myFs.rmf,
  os: myOs.osi,
  hash: await myHash.calculateHash,
  rn: myFs.rn,
  cp: await myFs.cp,
  mv: await myFs.mv,
  compress: await myBrotli.compress,
  decompress: await myBrotli.decompress,
};

const handleCommand = async (input) => {
  const args = splitString(input);
  const len = args.length;
  const command = args[0];
  if (command in commands && len === 1) {
    await commands[command](workingDir);
  } else if (command in commands && len === 2) {
    await commands[command](workingDir, args[1]);
  } else if (command in commands && len === 3) {
    await commands[command](workingDir, args[1], args[2]);
  } else {
    console.error(`\u001B[31m Invalid input \u001B[0m`);
  }
};

export default handleCommand;
