import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const pattern =
  /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/;
const ingredients = [];

rl.on("line", (line) => {
  const [_, name, capacity, durability, flavor, texture, calories] =
    line.match(pattern);

  ingredients.push({
    name,
    capacity: +capacity,
    durability: +durability,
    flavor: +flavor,
    texture: +texture,
    calories: +calories,
  });
});

rl.on("close", () => {
  let highestCookieScore = 0;
  let highest500CalCookieScore = 0;
  let highestCombinations = [0, 0];

  const combinations = getCombinations(ingredients.length, 100);
  console.log(`Found ${combinations.length} combinations`);
  let index = 0;

  while (index < combinations.length) {
    let score = 0;
    let totalCapacity = 0;
    let totalDurability = 0;
    let totalFlavor = 0;
    let totalTexture = 0;
    let totalCalories = 0;

    const amounts = combinations[index];

    for (let i = 0; i < amounts.length; i++) {
      totalCapacity += amounts[i] * ingredients[i].capacity;
      totalDurability += amounts[i] * ingredients[i].durability;
      totalFlavor += amounts[i] * ingredients[i].flavor;
      totalTexture += amounts[i] * ingredients[i].texture;
      totalCalories += amounts[i] * ingredients[i].calories;
    }

    score =
      Math.max(totalCapacity, 0) *
      Math.max(totalDurability, 0) *
      Math.max(totalFlavor, 0) *
      Math.max(totalTexture, 0);

    if (score > highestCookieScore) {
      highestCookieScore = score;
      highestCombinations = combinations[index];
    }

    if (totalCalories === 500 && score > highest500CalCookieScore) {
      highest500CalCookieScore = score;
    }

    index++;
  }

  console.log(`Highest cookie score : ${highestCookieScore}`);
  console.log(`Highest cookies score (500 cal) : ${highest500CalCookieScore}`);
});

function getCombinations(n, size) {
  if (n == 0) {
    return [];
  }

  const arr = [];
  for (let i = 0; i <= size; i++) {
    const subArrs = getCombinations(n - 1, size - i);
    if (subArrs.length == 0) {
      arr.push([i]);
    } else {
      for (let j = 0; j < subArrs.length; j++) {
        subArrs[j].unshift(i);
        arr.push(subArrs[j]);
      }
    }
  }

  return arr;
}
