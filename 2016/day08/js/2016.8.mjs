import { readFileSync } from "node:fs";

function getInstructions() {
  const input = readFileSync("../input.txt").toString();
  const lines = input.split("\n");

  const rectPattern = /^rect (\d+)x(\d+)$/;
  const rotatePattern = /^rotate (\w+) [y|x]=(\d+) by (\d+)$/;
  const instructions = [];

  for (const line of lines) {
    const rect = line.match(rectPattern);
    const rotate = line.match(rotatePattern);
    if (rect) {
      instructions.push({ op: "rect", x: +rect[1], y: +rect[2] });
    } else if (rotate) {
      let instruction = { op: "", target: +rotate[2], offset: +rotate[3] };
      instruction.op = rotate[1] === "row" ? "rotateRow" : "rotateCol";
      instructions.push(instruction);
    }
  }

  return instructions;
}

function printAndCountLitLights(screen) {
  let litLights = 0;
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      process.stdout.write(screen[i][j]);
      if (screen[i][j] === "#") {
        litLights++;
      }
    }
    process.stdout.write("\n");
  }

  return litLights;
}

function rect(screen, x, y) {
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      screen[i][j] = "#";
    }
  }
}

function rotateCol(screen, col, offset) {
  const rotated = new Array(screen.length).fill(".");

  for (let i = 0; i < screen.length; i++) {
    const rotatedPosition = (i + offset) % screen.length;
    rotated[rotatedPosition] = screen[i][col];
  }

  for (let i = 0; i < screen.length; i++) {
    screen[i][col] = rotated[i];
  }
}

function rotateRow(screen, row, offset) {
  const rotated = new Array(screen[row].length).fill(".");

  for (let i = 0; i < screen[row].length; i++) {
    const rotatedPosition = (i + offset) % screen[row].length;
    rotated[rotatedPosition] = screen[row][i];
  }

  for (let i = 0; i < screen[row].length; i++) {
    screen[row][i] = rotated[i];
  }
}

function getInitialScreen() {
  const screen = new Array(6);

  for (let i = 0; i < screen.length; i++) {
    screen[i] = new Array(50).fill(".");
  }

  return screen;
}

function simulate(screen, instructions) {
  for (const instruction of instructions) {
    switch (instruction.op) {
      case "rect":
        rect(screen, instruction.x, instruction.y);
        break;
      case "rotateRow":
        rotateRow(screen, instruction.target, instruction.offset);
        break;
      case "rotateCol":
        rotateCol(screen, instruction.target, instruction.offset);
        break;
    }
  }

  return printAndCountLitLights(screen);
}

const litLights = simulate(getInitialScreen(), getInstructions());

console.log("Part 1:", litLights);
