import * as readline from "node:readline";
import { createReadStream } from "node:fs";

const rl = readline.createInterface({
    input: createReadStream("../input.txt"),
    crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

let totalPaper = 0;
let totalRibbon = 0;
let separator = "x";
let dimensions = [];

rl.on("line", (line) => {
    let [l, w, h] = line.split(separator).map(value => +value);
    dimensions = [l, w, h].sort((a, b) => a - b);

    totalPaper += (2 * l * w) + (2 * w * h) + (2 * h * l);
    totalPaper += dimensions[0] * dimensions[1];

    totalRibbon += dimensions[0] + dimensions[0] + dimensions[1] + dimensions[1];
    totalRibbon += l * w * h;
});

rl.on("close", () => {
    console.log(`Total paper needed : ${totalPaper} square feet`);
    console.log(`Total ribbon needed : ${totalRibbon} square feet`);
});