import os from "node:os";

const osi = async (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(`\u001B[36m ${JSON.stringify(os.EOL)}\u001B[0m `);
      break;
    case "--cpus":
      os.cpus().forEach((element) => {
        console.log(element);
      });
      break;
    case "--homedir":
      console.log(`\u001B[36m ${os.homedir()}\u001B[0m `);
      break;
    case "--username":
      console.log(`\u001B[36m ${os.userInfo().username}\u001B[0m `);
      break;
    case "--architecture":
      console.log(`\u001B[36m ${os.arch()}\u001B[0m `);
      break;
    default:
      console.error(`\u001B[31m Invalid input \u001B[0m`);
      break;
  }
};

export default { osi };
