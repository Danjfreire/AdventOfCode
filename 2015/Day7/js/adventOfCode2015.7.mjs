import { readFileSync } from "node:fs";

function execCircuit(wires) {
    const input = readFileSync("../input.txt", "utf-8");
    const instructions = input.split("\n");
    const isValid = (input) => !input || wires[input] != null || !isNaN(input);
    const operations = {
        AND: (i1, i2) => { return i1 & i2 },
        OR: (i1, i2) => { return i1 | i2 },
        LSHIFT: (i1, i2) => { return i1 << i2 },
        RSHIFT: (i1, i2) => { return i1 >> i2 },
        NOT: (i1) => { return ~i1 },
    };

    let currentInstruction;
    let match;
    let inst;
    let input1;
    let op;
    let input2;
    let wireDest;

    while (instructions.length) {
        currentInstruction = instructions.shift();
        match = currentInstruction.match(/([a-z0-9]*)\b\s?([A-Z]+)?\s?(\w+)\s->\s(\w+)/)

        if (!match) {
            continue;
        }

        [inst, input1, op, input2, wireDest] = match;

        if (op) {
            if (op === 'NOT') { // NOT
                if (isValid(input2)) {
                    wires[wireDest] = operations['NOT'](wires[input2] || +input2)
                } else {
                    instructions.push(inst);
                }
            } else { // AND, OR, LSHIFT, RSHIFT
                if (isValid(input1) && isValid(input2)) {
                    wires[wireDest] = operations[op](wires[input1] || +input1, wires[input2] || +input2);
                } else {
                    instructions.push(inst);
                }
            }
        } else { // ASSIGN
            if (isValid(input2)) {
                wires[wireDest] = wires[wireDest] || wires[input2] || +input2; // each wire can only be assigned once
            } else {
                instructions.push(inst);
            }
        }
    }

    return wires.a;
}

const part1 = execCircuit({});
console.log("Part 1: " + part1);

const part2 = execCircuit({ b: part1 });
console.log("Part 2: " + part2);
