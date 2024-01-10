import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const volumes = [];
const TARGET_VOLUME = 150;

rl.on("line", (line) => {
  volumes.push(Number(line));
});

rl.on("close", () => {
  console.log(volumes);

  const combinations = getCombinations(volumes, TARGET_VOLUME);
  console.log(combinations);
  console.log("Total possible Combinations : ", combinations.length);

  let minimumContainers = Infinity;
  combinations.forEach((comb) => {
    if (comb.length < minimumContainers) {
      minimumContainers = comb.length;
    }
  });

  const combinationsWithMinimalContainers = combinations.filter(
    (comb) => comb.length === minimumContainers
  );
  console.log(
    "Combinations using the minimum amount of containers:",
    combinationsWithMinimalContainers.length
  );
});

function getCombinations(volumes, targetVolume) {
  const combinations = volumes
    .map((_, i) => getCombinationsWithItems(i, volumes, [], targetVolume))
    .flat();
  return combinations;
}

function getCombinationsWithItems(
  startIndex,
  baseVolumes,
  currentItems,
  targetVolume
) {
  const combinations = [];
  // 1 - see if adding the current index matches exacly the target volume
  const updatedVolume = currentItems.reduce((prev, cur) => {
    return prev + cur;
  }, baseVolumes[startIndex]);

  if (updatedVolume === targetVolume) {
    combinations.push([...currentItems, baseVolumes[startIndex]]);
    return combinations;
  } else if (updatedVolume < targetVolume) {
    const updatedItems = [...currentItems, baseVolumes[startIndex]];
    // 2 - starting at the startIndex, try to build every combination
    let newStartingIndex = startIndex + 1;
    while (newStartingIndex < baseVolumes.length) {
      const subCombinations = getCombinationsWithItems(
        newStartingIndex,
        baseVolumes,
        updatedItems,
        targetVolume
      );

      const validSubCombinations = subCombinations.filter(
        (comb) => comb.length > 0
      );
      validSubCombinations.forEach((comb) => combinations.push(comb));
      newStartingIndex++;
    }
  } else {
    return [];
  }

  return combinations;
}
