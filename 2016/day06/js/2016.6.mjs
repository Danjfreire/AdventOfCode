import { readFileSync } from "node:fs";

function readInput() {
  const content = readFileSync("../input.txt").toString();
  const lines = content.split("\n");

  return lines;
}

function getFrequentsCharsForPosition(lines, position) {
  const map = new Map();
  for (const line of lines) {
    const char = line[position];
    const frequency = map.get(char);
    frequency !== undefined ? map.set(char, frequency + 1) : map.set(char, 1);
  }

  let moreFrequentChar = "";
  let highestFrequency = -Infinity;
  let leastFrequentChar = "";
  let lowestFrequency = Infinity;

  for (const [key, value] of map) {
    if (value > highestFrequency) {
      highestFrequency = value;
      moreFrequentChar = key;
    }

    if (value < lowestFrequency) {
      lowestFrequency = value;
      leastFrequentChar = key;
    }
  }

  return { leastFrequentChar, moreFrequentChar };
}

const input = readInput();
let part1 = "";
let part2 = "";
for (let i = 0; i < input[0].length; i++) {
  const { leastFrequentChar, moreFrequentChar } = getFrequentsCharsForPosition(input, i);
  part1 += moreFrequentChar;
  part2 += leastFrequentChar;
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
