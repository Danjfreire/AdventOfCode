import MD5 from 'md5';

const part1Prefix = '00000';
const part2Prefix = '000000';
const input = 'iwrupvqb';
let iteration = 0;
let currentMd5 = '';
let part1Solved = false;

while(true) {
    currentMd5 = MD5(input + iteration);

    if (iteration % 100000 == 0) {
        console.log(iteration);
    }

    if(currentMd5.startsWith(part1Prefix) && !part1Solved) {
        console.log("Part 1 Solution: " + iteration);
        part1Solved = true;
    }

    if(currentMd5.startsWith(part2Prefix)) {
        console.log("Part 2 Solution: " + iteration);
        break;
    }

    iteration++;
}