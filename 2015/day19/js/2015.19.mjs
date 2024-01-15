import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const replacementMap = new Map();
let baseMolecule = "";

const replacementPattern = /^(\w+) => (\w+)/;
const blankLinePattern = /^\s*$/;
let gotAllReplacements = false;

rl.on("line", (line) => {
  const replacementMatch = line.match(replacementPattern);
  const blankLineMatch = line.match(blankLinePattern);

  if (gotAllReplacements) {
    baseMolecule = baseMolecule.concat(line);
  }

  if (replacementMatch) {
    const [_, from, to] = replacementMatch;
    if (replacementMap.has(from)) {
      replacementMap.get(from).push(to);
    } else {
      replacementMap.set(from, [to]);
    }
  }

  if (blankLineMatch) {
    gotAllReplacements = true;
  }
});

rl.on("close", () => {
  console.log(baseMolecule);
  const combinations = getAllCombinations(baseMolecule, replacementMap);

  console.log(`Part 1 :  ${combinations.size}`);
});

function getAllCombinations(base, replacements) {
  const combinations = new Set();

  let index = 0;

  while (index < base.length) {
    const startIndex = index;
    let endIndex = startIndex + 1;
    let replaced = false;

    while (!replaced) {
      const subStr = baseMolecule.substring(startIndex, endIndex);

      if (replacements.has(subStr)) {
        for (let replacement of replacements.get(subStr)) {
          combinations.add(
            sliceString(baseMolecule, startIndex, subStr.length, replacement)
          );
        }
        endIndex++;
        replaced = true;
      } else {
        endIndex++;
        if (subStr.length >= 2) {
          replaced = true;
        }
      }
    }

    index++;
  }

  return combinations;
}

function sliceString(str, startIndex, count, replacement) {
  return str.slice(0, startIndex) + replacement + str.slice(startIndex + count);
}
