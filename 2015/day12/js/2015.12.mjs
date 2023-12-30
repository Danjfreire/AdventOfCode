import { readFileSync } from "node:fs";

function getSum(prop) {
  let sum = 0;

  if (Array.isArray(prop)) {
    for (const element of prop) {
      sum += getSum(element);
    }
  } else if (typeof prop === "object") {
    if (IGNORE_RED && Object.values(prop).includes("red")) {
      return 0;
    }
    for (const key in prop) {
      sum += getSum(prop[key]);
    }
  } else if (typeof prop === "number") {
    return Number(prop);
  } else {
    return 0;
  }

  return sum;
}

const IGNORE_RED = true;
const buffer = readFileSync("../input.json");
const parsedJSON = JSON.parse(buffer.toString());
const resultSum = getSum(parsedJSON);
console.log("the resulting sum is : ", resultSum);
