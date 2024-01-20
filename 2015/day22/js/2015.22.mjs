class GameManager {
  constructor(difficulty, player, boss, manaSpent, activeEffects, log) {
    this.difficulty = difficulty;
    this.player = player;
    this.boss = boss;
    this.activeEffects = activeEffects || [];
    this.manaSpent = manaSpent;
    this.gameOver = false;
    this.log = log || [];
  }

  playerTurn(spell, playerRoundBonuses) {
    if (this.difficulty === "hard") {
      this.player.hp -= 1;
      if (this.isGameOver()) return;
    }

    this.player.mana += playerRoundBonuses.playerManaRegen;
    this.boss.hp -= playerRoundBonuses.bossDamage;

    if (this.isGameOver()) return;

    this.manaSpent += spell.manaCost;
    this.player.mana -= spell.manaCost;
    this.boss.hp -= spell.damage;
    this.player.hp += spell.healing;

    if (spell.effect) {
      this.activeEffects.push({ ...spell.effect });
    }

    this.log.push(
      `player turn - ${spell.name} | P.HP:${this.player.hp} P.MP:${this.player.mana}  B:${this.boss.hp}`
    );
  }

  tickEffects() {
    const roundBonuses = {
      bossDamage: 0,
      playerArmor: 0,
      playerManaRegen: 0,
    };

    for (const effect of this.activeEffects) {
      effect.effectFn(roundBonuses);
      effect.duration--;
    }

    this.activeEffects = this.activeEffects.filter(
      (effect) => effect.duration > 0
    );

    return roundBonuses;
  }

  bossTurn(bossRoundBonuses) {
    this.player.mana += bossRoundBonuses.playerManaRegen;
    this.boss.hp -= bossRoundBonuses.bossDamage;
    if (this.isGameOver()) return;
    this.player.hp -= Math.max(
      1,
      this.boss.damage - (this.player.armor + bossRoundBonuses.playerArmor)
    );
    this.log.push(
      `boss turn - attacks player | P:${this.player.hp} P.MP:${this.player.mana} B:${this.boss.hp}`
    );
  }

  takeTurn(spell) {
    const playerRoundBonuses = this.tickEffects();
    this.playerTurn(spell, playerRoundBonuses);
    const bossRoundBonuses = this.tickEffects();
    this.bossTurn(bossRoundBonuses);
  }

  isGameOver() {
    return this.player.hp <= 0 || this.boss.hp <= 0;
  }
}

class Spell {
  constructor(name, manaCost, damage, healing, effect) {
    this.name = name;
    this.manaCost = manaCost;
    this.damage = damage;
    this.healing = healing;
    this.effect = effect;
  }
}

class Effect {
  constructor(name, duration, effectFn) {
    this.name = name;
    this.duration = duration;
    this.effectFn = effectFn;
  }

  apply(roundBonuses) {
    this.effectFn(roundBonuses);
  }
}

const applyPoison = (roundBonuses) => {
  roundBonuses.bossDamage += 3;
};

const applyShield = (roundBonuses) => {
  roundBonuses.playerArmor += 7;
};

const applyRecharge = (roundBonuses) => {
  roundBonuses.playerManaRegen += 101;
};

const poisonEffect = new Effect("poison", 6, applyPoison);
const shieldEffect = new Effect("shield", 6, applyShield);
const rechargeEffect = new Effect("recharge", 5, applyRecharge);

const magicMissile = new Spell("Magic Missile", 53, 4, 0, null);
const drain = new Spell("Drain", 73, 2, 2, null);
const shield = new Spell("Shield", 113, 0, 0, shieldEffect);
const poison = new Spell("Poison", 173, 0, 0, poisonEffect);
const recharge = new Spell("Recharge", 229, 0, 0, rechargeEffect);

const spellList = [magicMissile, drain, shield, poison, recharge];

function getAvailableSpells(game) {
  if (game.isGameOver()) return [];

  return spellList.filter((spell) => {
    const hasMana = game.player.mana >= spell.manaCost;
    const hasActiveEffect = game.activeEffects.find(
      (effect) =>
        spell.effect && effect.name === spell.effect.name && effect.duration > 1
    );

    return hasMana && !hasActiveEffect;
  });
}

function findOptimalManaSpent(game, minManaSpent) {
  if (game.isGameOver()) {
    if (game.player.hp > 0 && game.manaSpent < minManaSpent) {
      // console.log("Mana spent :", game.manaSpent);
      // console.log(game.log);
      minManaSpent = game.manaSpent;
    }
    return minManaSpent;
  } else {
    if (game.manaSpent > minManaSpent) {
      return minManaSpent;
    }
  }

  const availableSpells = getAvailableSpells(game);

  if (availableSpells.length === 0) {
    return minManaSpent; // the boss won
  }

  for (const spell of availableSpells) {
    const newGame = new GameManager(
      game.difficulty,
      { ...game.player },
      { ...game.boss },
      game.manaSpent,
      game.activeEffects.map((effect) => ({ ...effect })),
      [...game.log]
    );

    newGame.takeTurn(spell);
    minManaSpent = findOptimalManaSpent(newGame, minManaSpent);
  }

  return minManaSpent;
}

const player = {
  hp: 50,
  mana: 500,
  armor: 0,
};

const boss = {
  hp: 55,
  damage: 8,
};
const normalGame = new GameManager("normal", player, boss, 0, [], []);
const hardGame = new GameManager("hard", player, boss, 0, [], []);
const part1ManaSpent = findOptimalManaSpent(normalGame, Infinity);
const part2ManaSpent = findOptimalManaSpent(hardGame, Infinity);
console.log("Part 1:", part1ManaSpent);
console.log("Part 2:", part2ManaSpent);
