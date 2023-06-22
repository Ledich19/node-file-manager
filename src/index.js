import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import os from "node:os";
import myCd from "./modules/my-cd.js";
import myLs from "./modules/my-ls.js";
import myFs from "./modules/my-fs.js";
import myOs from "./modules/my-os.js";
import myHash from "./modules/my-hash.js";
import myBrotli from "./modules/my-brotli.js";

const username = process.argv[2].slice(2).split("=")[1];
let workingDir = os.homedir();
const rl = readline.createInterface({ input: stdin, output: stdout });

console.log(
  `\u001B[33m Welcome to the File Manager,\u001B[35m${username}\n`,
  `\u001B[0m You are currently in \u001B[32m${workingDir}\u001B[0m`
);

const handleCommand = async (input) => {
  const args = input.trim().split(" ");
  const command = args[0];
  switch (true) {
    case command === "up":
      workingDir = myCd.up(workingDir);
      break;
    case command === "cd" && args.length === 2:
      workingDir = await myCd.cd(workingDir, args[1]);
      break;
    case command === "ls":
      myLs.ls(workingDir);
      break;
    case command === "cat" && args.length === 2:
      myFs.cat(workingDir, args[1]);
      break;
    case command === "add" && args.length === 2:
      myFs.add(workingDir, args[1]);
      break;
    case command === "rn" && args.length === 3:
      myFs.rn(workingDir, args[1], args[2]);
      break;
    case command === "cp" && args.length === 3:
      myFs.cp(workingDir, args[1], args[2]);
      break;
    case command === "mv" && args.length === 3:
      myFs.mv(workingDir, args[1], args[2]);
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

rl.on("line", async (input) => {
  try {
    if (input === ".exit") {
      rl.close();
    } else {
      await handleCommand(input);
    }
  } catch (error) {
    console.error(`\u001B[31m Operation failed \u001B[0m`, error);
  } finally {
    if (input !== ".exit") {
      console.log(
        `You are currently in \u001B[32m${workingDir}\u001B[0m`
      );
    }
  }
});

rl.on("close", () => {
  console.log(
    `\u001B[33m Thank you for using File Manager, \u001B[35m${username},\u001B[33m goodbye! \n \u001B[0m`
  );
});
