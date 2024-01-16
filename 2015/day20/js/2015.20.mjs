const input = 33_100_000;

const presents = [];
const presents2 = [];

// since each elf delivers house * 10 presents by house
// we only need to iterate up to input/10, because this house
// would deliver the amount of presents of the input

for (let elf = 1; elf <= input / 10; elf++) {
  let visits = 0;
  for (let house = elf; house <= input / 10; house = house + elf) {
    presents[house] = (presents[house] ?? 0) + elf * 10;

    if (visits < 50) {
      presents2[house] = (presents2[house] ?? 0) + elf * 11;
      visits++;
    }
  }
}

const partOne = presents.findIndex((p) => p >= input);
const partTwo = presents2.findIndex((p) => p >= input);

console.log("Part 1:", partOne);
console.log("Part 2:", partTwo);
