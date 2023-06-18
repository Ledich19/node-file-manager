import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import os from "node:os";
import path from "node:path";
import myCd from "./modules/my-cd.js";
import { mkdir, access, copyFile, readdir, stat } from "node:fs/promises";
import { log } from "node:console";
// npm run start -- --username=Aleksandr
const username = process.argv[2].slice(2).split("=")[1];
let workingDir = os.homedir();
const rl = readline.createInterface({ input: stdin, output: stdout });
console.log(`\u001B[33m Welcome to the File Manager, \u001B[35m${username}\u001B[0m`);
console.log(`\u001B[33m You are currently in \u001B[32m${workingDir}\u001B[0m`);

rl.on("line", async (input) => {
  try {
    if (input === ".exit") {
      rl.close();
    } else if (input === "up") {
      workingDir = myCd.up(workingDir);
    } else if (input.startsWith("cd ")) {
      workingDir = await myCd.cd(workingDir, input.slice(3).trim());
    } else if (input === "ls") {
    } else {
      console.log(`\u001B[31m Invalid input \u001B[0m`);
    }
  } catch (error) {
    console.log(`\u001B[31m Operation failed \u001B[0m`, error);
  } finally {
    if (input !== ".exit") {
      console.log(
        `\u001B[33m You are currently in \u001B[32m${workingDir}\u001B[0m`
      );
    }
  }
});

rl.on("close", (code) => {
  console.log(
    `\u001B[33m Thank you for using File Manager, \u001B[35m${username},\u001B[33m goodbye! \n \u001B[0m`
  );
});
