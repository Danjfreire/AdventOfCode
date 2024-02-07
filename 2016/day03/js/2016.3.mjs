import { readFileSync } from "node:fs";

function isPossibleTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function getTrianglesHorizontally() {
  const content = readFileSync("../input.txt").toString();
  const lines = content.split("\n");
  const triangles = lines.map((line) => line.trim().split(/\s+/));

  return triangles.filter(([a, b, c]) => isPossibleTriangle(+a, +b, +c)).length;
}

function getTrianglesVertically() {
  const content = readFileSync("../input.txt").toString();
  const lines = content.split("\n");
  const sides = lines.map((line) => line.trim().split(/\s+/));

  const triangles = [];

  for (let i = 0; i < sides.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      triangles.push([sides[i][j], sides[i + 1][j], sides[i + 2][j]]);
    }
  }

  return triangles.filter(([a, b, c]) => isPossibleTriangle(+a, +b, +c)).length;
}

console.log("Part 1: ", getTrianglesHorizontally());
console.log("Part 2: ", getTrianglesVertically());
