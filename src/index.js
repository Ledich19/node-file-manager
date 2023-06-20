import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import os from "node:os";
import path from "node:path";
import myCd from "./modules/my-cd.js";
import myLs from "./modules/my-ls.js";
import myFs from "./modules/my-fs.js";
import myOs from "./modules/my-os.js";
import { mkdir, access, copyFile, readdir, stat } from "node:fs/promises";
import { log } from "node:console";
// npm run start -- --username=Aleksandr
const username = process.argv[2].slice(2).split("=")[1];
let workingDir = os.homedir();
const rl = readline.createInterface({ input: stdin, output: stdout });
console.log(`\u001B[33m Welcome to the File Manager, \u001B[35m${username}\u001B[0m`);
console.log(`\u001B[33m You are currently in \u001B[32m${workingDir}\u001B[0m`);

rl.on("line", async (input) => {
const args = input.split(' ')

  try {
    if (input === ".exit") {
      rl.close();
    } else if (input === "up") {
      workingDir = myCd.up(workingDir);
    } else if (input.startsWith("cd ")) {
      workingDir = await myCd.cd(workingDir, input.slice(3).trim());
    } else if (input === "ls") {
      myLs.ls(workingDir)
    }
    else if (input.startsWith("cat ")) {
      myFs.cat(workingDir, args[1])
    }
    else if (input.startsWith("add ")) {
      myFs.add(workingDir, args[1])
    }
    else if (input.startsWith("rn " )) {
      myFs.rn(workingDir, args[1], args[2])
    }
    else if (input.startsWith("cp ")) {
      console.log('-------cp');
      myFs.cp(workingDir, args[1], args[2])
    }
    else if (input.startsWith("mv ")) {
      console.log('MV');
      myFs.mv(workingDir, args[1], args[2])
    }
    else if (input.startsWith("rm ")) {
      myFs.rmf(workingDir, args[1])
    }
    else if (input.startsWith("os ")) {
      myOs.osi(args[1])
    }
    
    else {
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
