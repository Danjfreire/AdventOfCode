import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const pattern =
  /^(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+).$/;

const happinessMap = new Map();
const names = new Set();

rl.on("line", (line) => {
  const [_, who, result, amount, nextTo] = line.match(pattern);
  const multiply = result === "gain" ? 1 : -1;
  happinessMap.set(`${who}-${nextTo}`, amount * multiply);
  names.add(who);
});

rl.on("close", () => {
  // part 1
  const res1 = getHappiness(Array.from(names), happinessMap);
  console.log("Part 1");
  console.log("Best seat order: ", res1.permutation);
  console.log("Happiness change: ", res1.change);

  console.log("------------------------------------------");
  // part 2
  console.log("Part 2");
  names.forEach((name) => {
    happinessMap.set(`${"me"}-${name}`, 0);
    happinessMap.set(`${name}-${"me"}`, 0);
  });
  names.add("me");

  const res2 = getHappiness(Array.from(names), happinessMap);
  console.log("Best seat order: ", res2.permutation);
  console.log("Happiness change: ", res2.change);
});

/**
 *
 * @param {string[]} names
 * @param {Map<string, number>} happinessMap
 * @returns {number} total change in happiness
 */
function getHappiness(names, happinessMap) {
  const namePermutations = generatePermutations(names);
  console.log(`Found ${namePermutations.length} possible permutations`);
  const namesLength = names.length;

  let highestChange = -Infinity;
  let bestPermutation;
  let currentPermutation = 0;

  while (currentPermutation < namePermutations.length) {
    let permutationChange = 0;
    let permutation = namePermutations[currentPermutation];

    for (let i = 0; i < namesLength; i++) {
      const p1 = permutation[i];
      const p2 = permutation[(i + 1) % namesLength];
      permutationChange +=
        happinessMap.get(`${p1}-${p2}`) + happinessMap.get(`${p2}-${p1}`);
    }

    if (permutationChange > highestChange) {
      highestChange = permutationChange;
      bestPermutation = permutation;
    }
    currentPermutation++;
  }

  return { permutation: bestPermutation, change: highestChange };
}

function generatePermutations(array) {
  // Heap's algorithm
  const permutations = [];

  function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  function generate(n) {
    if (n === 1) {
      permutations.push([...array]);
      return;
    }

    for (let i = 0; i < n; i++) {
      generate(n - 1);

      if (n % 2 === 0) {
        swap(i, n - 1);
      } else {
        swap(0, n - 1);
      }
    }
  }

  generate(array.length);
  return permutations;
}
