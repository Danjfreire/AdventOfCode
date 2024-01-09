import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const spec = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

let p1Aunt = -1;
let p1HighestScore = 0;
let p2Aunt = -1;
let p2HighestScore = 0;
const pattern = /^Sue (\d+): (.*)$/;

rl.on("line", (line) => {
  const [_, auntNumber, spec] = line.match(pattern);
  const part1LineScore = spec.split(",").reduce(part1Similarity, 0);
  const part2LineScore = spec.split(",").reduce(part2Similarity, 0);

  if (part1LineScore > p1HighestScore) {
    p1Aunt = auntNumber;
    p1HighestScore = part1LineScore;
  }

  if (part2LineScore > p2HighestScore) {
    p2Aunt = auntNumber;
    p2HighestScore = part2LineScore;
  }
});

rl.on("close", () => {
  console.log("Part 1:");
  console.log("Most similar aunt: ", p1Aunt);
  console.log("Score:", p1HighestScore);
  console.log("------------------------------------------");
  console.log("Part 2:");
  console.log("Most similar aunt: ", p2Aunt);
  console.log("Score:", p2HighestScore);
  console.log("------------------------------------------");
});

function part1Similarity(accum, curr) {
  const [item, qty] = curr.trim().split(":");
  if (spec[item] === Number(qty)) {
    return accum + 1;
  }
  return accum;
}

function part2Similarity(accum, curr) {
  const [item, qty] = curr.trim().split(":");

  let add = 0;
  if (item === "cats" || item === "trees") {
    add = spec[item] < Number(qty) ? 1 : 0;
  } else if (item === "pomeranians" || item === "goldfish") {
    add = spec[item] > Number(qty) ? 1 : 0;
  } else {
    add = spec[item] === Number(qty) ? 1 : 0;
  }

  return accum + add;
}
