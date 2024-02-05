import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function getInstructions() {
  const path = resolve("../input.txt");
  const content = readFileSync(path).toString();
  const instructions = content.split(",");

  return instructions.map((i) => i.trim());
}

class Rotation {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  turn(side) {
    switch (side) {
      case "R":
        this.turnRight();
        break;
      case "L":
        this.turnLeft();
        break;
      default:
        throw new Error("Invalid turn direction");
    }
    return { x: this.x, y: this.y };
  }

  turnRight() {
    if (this.x === 0 && this.y === 1) {
      this.x = 1;
      this.y = 0;
    } else if (this.x === 1 && this.y === 0) {
      this.x = 0;
      this.y = -1;
    } else if (this.x === 0 && this.y === -1) {
      this.x = -1;
      this.y = 0;
    } else if (this.x === -1 && this.y === 0) {
      this.x = 0;
      this.y = 1;
    }
  }

  turnLeft() {
    if (this.x === 0 && this.y === 1) {
      this.x = -1;
      this.y = 0;
    } else if (this.x === 1 && this.y === 0) {
      this.x = 0;
      this.y = 1;
    } else if (this.x === 0 && this.y === -1) {
      this.x = 1;
      this.y = 0;
    } else if (this.x === -1 && this.y === 0) {
      this.x = 0;
      this.y = -1;
    }
  }
}

function simulate(stopAtRepeatedPosition) {
  const rotation = new Rotation(0, 1);
  const instructions = getInstructions();
  const position = { x: 0, y: 0 };
  const positionHistory = new Set();

  const pattern = /([L|R])(\d+)/;

  for (const instruction of instructions) {
    const [_, turnSide, walk] = instruction.match(pattern);
    const newRotation = rotation.turn(turnSide);
    for (let step = 0; step < walk; step++) {
      position.x += newRotation.x;
      position.y += newRotation.y;
      const history = `${position.x}, ${position.y}`;
      if (stopAtRepeatedPosition && positionHistory.has(history)) {
        return position;
      }

      positionHistory.add(history);
    }
  }

  return position;
}

function getDistance(position) {
  return Math.abs(0 - position.x) + Math.abs(0 - position.y);
}

const position1 = simulate(false);
const position2 = simulate(true);

const distance1 = getDistance(position1);
const distance2 = getDistance(position2);

console.log("Part1 :", distance1);
console.log("Part2 :", distance2);
