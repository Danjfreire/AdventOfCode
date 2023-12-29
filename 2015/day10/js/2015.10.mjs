function lookAndsay(input) {
    let tmp = [];
    let j = 0;
    let k = 0;
    let char;

    while (j < input.length) {
        char = input[j];
        k = j + 1;
        while (k < input.length && input[k] === char) {
            k++;
        }
        tmp.push((k - j));
        tmp.push(char);
        j = k;
    }

    return tmp;
}

const puzzleInput = '1113122113';
const pt1Iterations = 40;
const pt2Iterations = 50;
let res1;
let res2;
let currentIteration = 1;
let currentInput = puzzleInput.split('').map(Number);

console.time('part1');
console.time('part2');
while (true) {
    currentInput = lookAndsay(currentInput);

    if (currentIteration === pt1Iterations) {
        res1 = currentInput.length;
        console.timeEnd('part1');
    }

    if (currentIteration === pt2Iterations) {
        res2 = currentInput.length;
        console.timeEnd('part2');
        break;
    }

    currentIteration++;
}

console.log(`Part 1: ${res1}`);
console.log(`Part 2: ${res2}`);
