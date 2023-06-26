import * as readline from "node:readline";
import { createReadStream } from "node:fs";

function santaDelivery() {
    const rl = readline.createInterface({
        input: createReadStream("../input.txt"),
        crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
    });

    const houses = new Set();
    let currentX = 0;
    let currentY = 0;

    houses.add(`0,0`);

    rl.on('line', (line) => {
        for (const input of line) {
            switch(input) {
                case '^': currentY+=1; break;
                case 'v': currentY-=1; break;
                case '>': currentX+=1; break;
                case '<': currentX-=1; break;
                default: break;
            }

            houses.add(`${currentX},${currentY}`);
        }
    });

    rl.on('close', () => {
        console.log(`Unique houses passed by Santa : ${houses.size}`);
    });
}

function santaAndRobotDelivery() {
    const rl = readline.createInterface({
        input: createReadStream("../input.txt"),
        crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
    });

    const houses = new Set();

    let santa = {
        x: 0,
        y: 0
    }

    let robot = {
        x: 0,
        y: 0,
    }

    houses.add(`0,0`);
    let iteration = 0;
    let currentDelivery;

    rl.on('line', (line) => {
        for (const input of line) {

            if (iteration % 2 == 0) {
				currentDelivery = santa;
			}
			else {
				currentDelivery = robot;
			}

            switch(input) {
                case '^': currentDelivery.y+=1; break;
                case 'v': currentDelivery.y-=1; break;
                case '>': currentDelivery.x+=1; break;
                case '<': currentDelivery.x-=1; break;
                default: break;
            }

            houses.add(`${currentDelivery.x},${currentDelivery.y}`);
            iteration++;
        }
    });

    rl.on('close', () => {
        console.log(`Unique houses passed by Santa + Robot: ${houses.size}`);
    });
}

santaDelivery();
santaAndRobotDelivery();