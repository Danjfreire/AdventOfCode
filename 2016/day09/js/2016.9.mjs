import { readFileSync } from "node:fs";

function getInput() {
  const input = readFileSync("../input.txt").toString();
  return input;
}

function decompress(input, isPart2 = false) {
  let decompressedLength = 0;

  while (input.length > 0) {
    if (input[0] === "(") {
      const match = input.match(/^\((\d+)x(\d+)\)(.*)$/);
      const sub = match[1];
      const repeat = match[2];
      const rest = match[3];

      if (isPart2) {
        const sublength = decompress(rest.substring(0, +sub), isPart2);
        decompressedLength += sublength * +repeat;
      } else {
        decompressedLength += +sub * +repeat;
      }

      input = rest.substring(+sub);
    } else {
      decompressedLength += 1;
      input = input.substring(1);
    }
  }

  return decompressedLength;
}

const input = getInput();
console.log("Part 1 :", decompress(input));
console.log("Part 2 :", decompress(input, true));
