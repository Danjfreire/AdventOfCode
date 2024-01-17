import { readFileSync } from "node:fs";

function getItems() {
  const file = readFileSync("../items.txt");

  const items = [];

  const lines = file.toString().split("\n");
  const pattern = /^(\S+)\s(\S+)\s+(\d+)\s+(\d+)\s+(\d+)$/;
  lines.forEach((line) => {
    const [_, type, name, cost, damage, armor] = line.match(pattern);
    items.push({
      type,
      name,
      cost: Number(cost),
      damage: Number(damage),
      armor: Number(armor),
    });
  });

  return {
    weapons: items.filter((item) => item.type === "weapon"),
    armors: items.filter((item) => item.type === "armor"),
    rings: items.filter((item) => item.type === "ring"),
  };
}

function doesPlayerWin(player) {
  const BOSS = {
    hp: 103,
    damage: 9,
    armor: 2,
  };

  let turn = 1;
  while (player.hp > 0 && BOSS.hp > 0) {
    if (turn % 2 === 1) {
      // player turn
      BOSS.hp -= Math.max(1, player.damage - BOSS.armor);
    } else {
      // boss turn
      player.hp -= Math.max(1, BOSS.damage - player.armor);
    }
    turn++;
  }

  return BOSS.hp <= 0;
}

function simulateBattles(weapons, armors, rings) {
  let cheapestVictoryBuild = Infinity;
  let expensiveDefeatBuild = -Infinity;

  for (const weapon of weapons) {
    for (const armor of armors) {
      for (const ring1 of rings) {
        const otherRings = rings.filter((r) => r.name != ring1.name);
        for (const ring2 of otherRings) {
          const testPlayer = {
            hp: 100,
            damage: weapon.damage + ring1.damage + ring2.damage,
            armor: armor.armor + ring1.armor + ring2.armor,
            cost: weapon.cost + armor.cost + ring1.cost + ring2.cost,
          };

          if (doesPlayerWin(testPlayer)) {
            if (testPlayer.cost < cheapestVictoryBuild) {
              cheapestVictoryBuild = testPlayer.cost;
            }
          } else {
            if (testPlayer.cost > expensiveDefeatBuild) {
              expensiveDefeatBuild = testPlayer.cost;
            }
          }
        }
      }
    }
  }

  return {
    cheapestVictoryBuild,
    expensiveDefeatBuild,
  };
}

const { weapons, armors, rings } = getItems();
// add empty item to armors and rings, add 2 to rings because the player can go without any ring
armors.push({ name: "naked", cost: 0, damage: 0, armor: 0 });
rings.push({ name: "Damage+0", cost: 0, damage: 0, armor: 0 });
rings.push({ name: "Defense+0", cost: 0, damage: 0, armor: 0 });
const { cheapestVictoryBuild, expensiveDefeatBuild } = simulateBattles(
  weapons,
  armors,
  rings
);

console.log("Part 1 : ", cheapestVictoryBuild);
console.log("Part 2 : ", expensiveDefeatBuild);
