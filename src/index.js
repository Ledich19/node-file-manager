import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import handleCommand, { workingDir } from "./modules/handleCommand.js";

const username = process.argv[2]?.slice(2).split("=")[1] || 'Anonymous';
const rl = readline.createInterface({ input: stdin, output: stdout });

console.log(
  `\u001B[33m Welcome to the File Manager, \u001B[35m${username}\n`,
  `\u001B[0m You are currently in \u001B[32m${workingDir}\u001B[0m`
);

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
      console.log(`You are currently in \u001B[32m${workingDir}\u001B[0m`);
    }
  }
});

rl.on("close", () => {
  console.log(
    `\u001B[33m Thank you for using File Manager, \u001B[35m${username},\u001B[33m goodbye! \n \u001B[0m`
  );
});
