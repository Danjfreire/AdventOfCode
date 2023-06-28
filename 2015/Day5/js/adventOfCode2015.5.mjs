import * as readline from "node:readline";
import { createReadStream } from "node:fs";

function isNiceString1(entry) {
    const forbiddenStrings = ['ab', 'cd', 'pq', 'xy'];

    for (const str of forbiddenStrings) {
        if (entry.includes(str)) {
            return false;
        }
    }

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let numberOfVowels = 0;
    let hasDoubleLetter = false;

    for (let i = 0; i < entry.length; i++) {
        if (vowels.includes(entry[i])) {
            numberOfVowels++;
        }

        if (i < entry.length - 1 && entry[i] == entry[i + 1]) {
            hasDoubleLetter = true;
        }
    }

    return numberOfVowels >= 3 && hasDoubleLetter;
}

function isNiceString2(entry) {
    let hasSequenceRepetition = false;
    let hasLetterRepetition = false;
    let sequence = '';

    for (let i = 0; i < entry.length; i++) {
        if (i < entry.length - 2 && entry[i] == entry[i + 2]) {
            hasLetterRepetition = true;
        }

        if (i < entry.length - 1) {
            sequence = entry[i - 1] + entry[i];
            if (entry.substring(i + 1).includes(sequence)) {
                hasSequenceRepetition = true;
            }
        }
    }

    return hasSequenceRepetition && hasLetterRepetition;
}

const rl = readline.createInterface({
    input: createReadStream("../input.txt"),
    crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

let niceStrings1 = 0;
let niceStrings2 = 0;

rl.on('line', (line) => {
    if (isNiceString1(line)) {
        niceStrings1++;
    }

    if (isNiceString2(line)) {
        niceStrings2++;
    }
});

rl.on('close', () => {
    console.log(`Number of nice strings (1) : ${niceStrings1}`);
    console.log(`Number of nice strings (2) : ${niceStrings2}`);
});