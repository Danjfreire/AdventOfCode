import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

let lights = [];
let buffer = [];
const TOTAL_FRAMES = 100;

rl.on("line", (line) => {
  const row = [];
  const bufferRow = [];
  for (let i = 0; i < line.length; i++) {
    row.push(line.charAt(i));
    bufferRow.push(".");
  }
  lights.push(row);
  buffer.push(bufferRow);
});

rl.on("close", () => {
  const fixedLights = [
    [0, 0],
    [0, lights[0].length - 1],
    [lights.length - 1, 0],
    [lights.length - 1, lights[0].length - 1],
  ];
  console.log(`Total lit lights:${run(fixedLights)}`);
});

function run(fixedLights = []) {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    render(fixedLights);
  }

  let litLights = 0;
  for (let row = 0; row < lights.length; row++) {
    for (let col = 0; col < lights[row].length; col++) {
      if (lights[row][col] === "#") litLights++;
    }
  }

  return litLights;
}

function render(fixedLights) {
  if (fixedLights.length > 0) {
    for (let i = 0; i < fixedLights.length; i++) {
      const [x, y] = fixedLights[i];
      lights[x][y] = "#";
    }
  }

  for (let row = 0; row < lights.length; row++) {
    for (let col = 0; col < lights[row].length; col++) {
      const litNeighbors = getLitNeighbors(row, col, lights);
      //   console.log("Litneighbors:", litNeighbors);
      if (lights[row][col] === "#") {
        if (litNeighbors === 2 || litNeighbors === 3) {
          buffer[row][col] = "#";
        } else {
          buffer[row][col] = ".";
        }
      } else {
        if (litNeighbors === 3) {
          buffer[row][col] = "#";
        } else {
          buffer[row][col] = ".";
        }
      }
    }
  }

  for (let row = 0; row < lights.length; row++) {
    for (let col = 0; col < lights[row].length; col++) {
      lights[row][col] = buffer[row][col];
    }
  }

  if (fixedLights.length > 0) {
    for (let i = 0; i < fixedLights.length; i++) {
      const [x, y] = fixedLights[i];
      lights[x][y] = "#";
    }
  }

  // console.log(lights);
}

function getLitNeighbors(x, y, buffer) {
  let lit = 0;
  const xBounds = [x - 1, x + 1];
  const yBounds = [y - 1, y + 1];

  for (let row = xBounds[0]; row <= xBounds[1]; row++) {
    for (let col = yBounds[0]; col <= yBounds[1]; col++) {
      if (row < 0 || row >= buffer.length) continue;
      if (col < 0 || col >= buffer[row].length) continue;
      if (row === x && col === y) continue;

      if (buffer[row][col] === "#") lit++;
    }
  }

  return lit;
}
