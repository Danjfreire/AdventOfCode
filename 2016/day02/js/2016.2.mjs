import { resolve } from "node:path";
import { readFileSync } from "node:fs";

const KEYPAD1 = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

const KEYPAD2 = [
  ["x", "x", "1", "x", "x"],
  ["x", "2", "3", "4", "x"],
  ["5", "6", "7", "8", "9"],
  ["x", "A", "B", "C", "x"],
  ["x", "x", "D", "x", "x"],
];

function solvePassword(keypad, startingPos) {
  const path = resolve("../input.txt");
  const content = readFileSync(path).toString();

  const lines = content.split("\n");
  let password = "";
  const position = { ...startingPos };

  for (const line of lines) {
    for (let d = 0; d < line.length; d++) {
      switch (line.charAt(d)) {
        case "L": {
          if (position.x > 0 && keypad[position.y][position.x - 1] !== "x") {
            position.x--;
          }
          break;
        }
        case "R": {
          if (
            position.x < keypad.length - 1 &&
            keypad[position.y][position.x + 1] !== "x"
          ) {
            position.x++;
          }
          break;
        }
        case "U": {
          if (position.y > 0 && keypad[position.y - 1][position.x] !== "x") {
            position.y--;
          }
          break;
        }
        case "D": {
          if (
            position.y < keypad.length - 1 &&
            keypad[position.y + 1][position.x] !== "x"
          ) {
            position.y++;
          }
          break;
        }
        default:
          throw new Error("invalid direction");
      }
    }
    password += keypad[position.y][position.x];
  }

  return password;
}

const part1 = solvePassword(KEYPAD1, { x: 1, y: 1 });
const part2 = solvePassword(KEYPAD2, { x: 0, y: 3 });

console.log("Part 1 :", part1);
console.log("Part 2 :", part2);
