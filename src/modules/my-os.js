import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { INVALID_INPUT } from "./constants.js";

const osi = async (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(`\u001B[36m ${JSON.stringify(EOL)}\u001B[0m `);
      break;
    case "--cpus":
      console.table(
        cpus().map((cpu) => ({ model: cpu.model, speed: cpu.speed }))
      );
      break;
    case "--homedir":
      console.log(`\u001B[36m ${homedir()}\u001B[0m `);
      break;
    case "--username":
      console.log(`\u001B[36m ${userInfo().username}\u001B[0m `);
      break;
    case "--architecture":
      console.log(`\u001B[36m ${arch()}\u001B[0m `);
      break;
    default:
      console.error(INVALID_INPUT);
      break;
  }
};

export default { osi };
