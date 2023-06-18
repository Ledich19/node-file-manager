import readline from "readline";
import { stdin, stdout } from 'node:process';
// npm run start -- --username=Aleksandr
const username = process.argv[2].slice(2).split('=')[1];
console.log(`\u001B[34m Welcome to the File Manager, \u001B[35m${username}\u001B[0m`);

const rl = readline.createInterface({  input: stdin, output: stdout });

rl.question("\u001B[33m Write new task \n\u001B[0m", (answer) => {
  if (answer === ".exit") {
    rl.close();
  }


});

rl.on("close", (code) => {
  console.log(`\u001B[33m Thank you for using File Manager, ${username}, goodbye! \n \u001B[0m`);
});
process.on("SIGINT", () => {
  rl.close();
});