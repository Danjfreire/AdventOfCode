import { readFileSync } from "node:fs";


function part1() {
    const input = readFileSync("../input.txt", "utf-8");

    let codeCharacters = 0;
    let memoryCharacters = 0;

    for (const line of input.split("\n")) {
        codeCharacters += line.length;
        memoryCharacters += line.replace(/(\\\\)|(\\")|(\\x[a-f0-9][a-f0-9])/g, "a").length - 2;
    }

    console.log(`Code characters: ${codeCharacters}`);
    console.log(`Memory characters: ${memoryCharacters}`);
    console.log(`Part 1: ${codeCharacters - memoryCharacters}`);
}

function part2() {
    const input = readFileSync("../input.txt", "utf-8");

    let codeCharacters = 0;
    let encodedCharacters = 0;

    for (const line of input.split("\n")) {
        // surrounding quotes count as 2 characters, so add 4 to the encoded count
        codeCharacters += line.length;
        encodedCharacters += line
            .replace(/(\\\\)|(\\")/g, "aaaa")
            .replace(/(\\x[a-f0-9][a-f0-9])/g, "aaaaa").length + 4;
    }

    console.log(`Code characters: ${codeCharacters}`);
    console.log(`Encoded characters: ${encodedCharacters}`);
    console.log(`Part 2: ${encodedCharacters - codeCharacters}`);
}

part1();
part2();