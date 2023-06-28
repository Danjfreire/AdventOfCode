import * as readline from "node:readline";
import { createReadStream } from "node:fs";

function part1() {
    const rl = readline.createInterface({
        input: createReadStream("../input.txt"),
        crlfDelay: Infinity // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
    });

    let lights = Array(1000).fill().map(() => Array(1000).fill(false));

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    rl.on('line', (line) => {
        if (line === '') return;
        let [, action, x1, y1, x2, y2] = line.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);

        startX = +x1;
        endX = +x2;
        startY = +y1;
        endY = +y2;

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                switch (action) {
                    case "turn on": lights[x][y] = true; break;
                    case "turn off": lights[x][y] = false; break;
                    case "toggle": lights[x][y] = !lights[x][y]; break;
                }
            }
        }
    });


    rl.on('close', () => {
        let count = 0;
        for (let x = 0; x < lights.length; x++) {
            for (let y = 0; y < lights[x].length; y++) {
                if (lights[x][y] === true) {
                    count++;
                }
            }
        }

        console.log(`Part 1: ${count}`);
    });
}

function part2() {
    const rl = readline.createInterface({
        input: createReadStream("../input.txt"),
        crlfDelay: Infinity // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
    });

    let lights = Array(1000).fill().map(() => Array(1000).fill(0));

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    rl.on('line', (line) => {
        if (line === '') return;
        let [, action, x1, y1, x2, y2] = line.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);

        startX = +x1;
        endX = +x2;
        startY = +y1;
        endY = +y2;

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                switch (action) {
                    case "turn on": lights[x][y] += 1; break;
                    case "turn off": lights[x][y] = lights[x][y] > 0 ? lights[x][y] - 1 : lights[x][y]; break;
                    case "toggle": lights[x][y] += 2; break;
                }
            }
        }
    });


    rl.on('close', () => {
        let totalBrightness = 0;
        for (let x = 0; x < lights.length; x++) {
            for (let y = 0; y < lights[x].length; y++) {
                    totalBrightness+= lights[x][y];
            }
        }

        console.log(`Part 2: ${totalBrightness}`);
    });
}

part1();
part2();