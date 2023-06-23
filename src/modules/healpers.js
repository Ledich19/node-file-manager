import path from "node:path";

export const createPath = async (workingDir, inputPath) => {
  let newPath = workingDir;
  if (path.isAbsolute(inputPath)) {
    newPath = inputPath;
  } else {
    newPath = path.resolve(workingDir, inputPath);
  }
  return newPath;
};

export const splitString = (str) => {
  const parts = [];
  let currentPart = '';
  let isInDoubleQuotes = false;
  let isInSingleQuotes = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === ' ' && !isInDoubleQuotes && !isInSingleQuotes) {
      if (currentPart !== '') {
        parts.push(currentPart);
        currentPart = '';
      }
    } else if (char === '"') {
      if (isInSingleQuotes) {
        currentPart += char;
      } else {
        isInDoubleQuotes = !isInDoubleQuotes;
      }
    } else if (char === "'") {
      if (isInDoubleQuotes) {
        currentPart += char;
      } else {
        isInSingleQuotes = !isInSingleQuotes;
      }
    } else {
      currentPart += char;
    }
  }

  if (currentPart !== '') {
    parts.push(currentPart);
  }

  return parts;
};