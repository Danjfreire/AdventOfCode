function isWall(x, y, favoriteNumber) {
  let value = x * x + 3 * x + 2 * x * y + y + y * y;
  value += favoriteNumber;
  const binary = value.toString(2);
  const ones = binary.split("").reduce((prev, curr) => {
    return curr === "1" ? prev + 1 : prev;
  }, 0);

  return ones % 2 !== 0;
}

function getValidMoves(position, favoriteNumber) {
  const neighbors = [];
  const { x, y } = position;

  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    // if is not out of bounds and is not a wall
    if (newX >= 0 && newY >= 0 && !isWall(newX, newY, favoriteNumber)) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
}

function getMinimumSteps(start, target, favoriteNumber) {
  // uses bfs to find the shortest path
  const queue = [];
  queue.push({ position: start, steps: 0 });
  const seem = new Set();
  let minimumSteps = -1;
  let reachedAt50 = 0;

  while (!queue.length !== 0) {
    const { position, steps } = queue.shift();
    if (position.x === target.x && position.y === target.y) {
      minimumSteps = steps;
      break;
    }

    if (!seem.has(`${position.x},${position.y}`)) {
      if (steps <= 50) {
        reachedAt50++;
      }
      seem.add(`${position.x},${position.y}`);
      const validMoves = getValidMoves(position, favoriteNumber);
      for (const move of validMoves) {
        queue.push({ position: move, steps: steps + 1 });
      }
    }
  }

  return { minimumSteps, reachedAt50 };
}

const favoriteNumber = 1352;
const target = { x: 31, y: 39 };
const { minimumSteps, reachedAt50 } = getMinimumSteps({ x: 1, y: 1 }, target, favoriteNumber);
console.log("Part 1:", minimumSteps);
console.log("Part 2:", reachedAt50);
