import * as readline from "node:readline";
import fs from "node:fs";

const rl = readline.createInterface({
  input: fs.createReadStream("../input.txt"),
  crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
});

const pattern =
  /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds.$/;

const reindeers = [];

rl.on("line", (line) => {
  const [_, name, speed, flight, rest] = line.match(pattern);
  reindeers.push({
    name,
    speed: Number(speed),
    flight: Number(flight),
    rest: Number(rest),
    travelled: 0,
    state: "running",
    stateTimer: 0,
    score: 0,
  });
});

rl.on("close", () => {
  // PART 1
  const TOTAL_TRAVEL_TIME = 2503;
  let timer = 0;
  let highestDistance = 0;
  while (timer < TOTAL_TRAVEL_TIME) {
    reindeers.forEach((deer) => {
      deer.stateTimer++;

      if (deer.state === "running") {
        deer.travelled += deer.speed;
        if (deer.stateTimer === deer.flight) {
          deer.state = "resting";
          deer.stateTimer = 0;
        }
        if (deer.travelled > highestDistance) {
          highestDistance = deer.travelled;
        }
      } else {
        if (deer.stateTimer === deer.rest) {
          deer.state = "running";
          deer.stateTimer = 0;
        }
      }
    });

    reindeers.forEach((deer) => {
      if (deer.travelled === highestDistance) {
        deer.score++;
      }
    });
    timer++;
  }

  console.log("Part 1 Winner :");
  reindeers.sort((a, b) => b.travelled - a.travelled);
  console.log(`${reindeers[0].name} - ${reindeers[0].travelled}`);

  console.log("----------------------------------------------");
  console.log("Part 2 Winner :");
  reindeers.sort((a, b) => b.score - a.score);
  console.log(`${reindeers[0].name} - ${reindeers[0].score}`);
});
