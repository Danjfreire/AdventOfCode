import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
    input: fs.createReadStream("../input.txt"),
    crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

let floor = 0;
let basementInputPosition = -1;
let iteration = 1;

rl.on("line", (line) => {
    for (const op of line) {
        if (op == '(') {
            floor++;
        }
        else if (op == ')') {
            floor--;
            if (floor == -1 && basementInputPosition == -1) {
                basementInputPosition = iteration;
            }
        }
        iteration++;
    }
});

rl.on("close", () => {
    console.log(`Final floor: ${floor}`);
    console.log(`Basement floor position: ${basementInputPosition}`);
 });

