import { readFileSync } from "node:fs";

const input = readFileSync("../input.txt", "utf8").trim();

// 1 - load cities and distances
// 2 - make all possible permutations
// 3 - find the shortest/logest path

const cities = new Set();
const distances = new Map();

for (const line of input.split("\n")) {
    const [_, from, to, distance] = line.match(/^(.*) to (.*) = (\d+)$/);
    cities.add(from);
    cities.add(to);
    distances.set(`${from},${to}`, +distance);
    distances.set(`${to},${from}`, +distance);
}

function generatePermutations(array) {  // Heap's algorithm
    const permutations = [];

    function swap(i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function generate(n) {
        if (n === 1) {
            permutations.push([...array]);
            return;
        }

        for (let i = 0; i < n; i++) {
            generate(n - 1);

            if (n % 2 === 0) {
                swap(i, n - 1);
            } else {
                swap(0, n - 1);
            }
        }
    }

    generate(array.length);
    return permutations;
}

let minPath = Infinity;
let maxPath = 0;

console.time('Permutations');
const permutations = generatePermutations([...cities]);
console.timeEnd('Permutations');

console.log(`Generated ${permutations.length} permutations`);

console.time('Path');
for (const permutation of permutations) {
    let path = 0;

    for (let i = 0; i < permutation.length - 1; i++) {
        path += distances.get(`${permutation[i]},${permutation[i + 1]}`);
    }

    if (path < minPath) {
        minPath = path;
    }    

    if(path > maxPath) {
        maxPath = path;
    }
}
console.timeEnd('Path');

console.log('Part 1:', minPath);
console.log('Part 2:', maxPath);