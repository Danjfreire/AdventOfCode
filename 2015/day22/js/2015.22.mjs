class GameManager {
  constructor(player, boss, manaSpent, activeEffects, log) {
    this.player = player;
    this.boss = boss;
    this.activeEffects = { ...activeEffects };
    this.manaSpent = manaSpent;
    this.gameOver = false;
    this.log = log || [];
  }

  playerTurn(spell) {
    this.manaSpent += spell.manaCost;
    this.player.mana -= spell.manaCost;
    this.boss.hp -= spell.damage;
    this.player.hp += spell.healing;

    if (spell.effect) {
      // TODO
    }

    this.log.push(
      `player turn - ${spell.name} | P.HP:${this.player.hp} P.MP:${this.player.mana}  B:${this.boss.hp}`
    );
  }

  tickEffects() {}

  bossTurn() {
    if (this.isGameOver()) return;
    this.player.hp -= Math.max(1, this.boss.damage - this.player.armor);
    this.log.push(
      `boss turn - attacks player | P:${this.player.hp} P.MP:${this.player.mana} B:${this.boss.hp}`
    );
  }

  takeTurn(spell) {
    this.tickEffects();
    this.playerTurn(spell);
    this.tickEffects();
    this.bossTurn();
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

  apply(game) {
    this.effectFn(game);
  }
}

const applyPoison = (game) => {
  game.boss.hp -= 3;
};

const applyShield = (game) => {
  game.player.armor += 7;
};

const applyRecharge = (game) => {
  game.player.mana += 101;
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
    const hasEffect =
      spell.effect != null &&
      game.activeEffects[spell.effect.name] != null &&
      game.activeEffects[spell.effect.name].duration > 1;

    return hasMana && !hasEffect;
  });
}

function findOptimalManaSpent(game, minManaSpent) {
  if (game.isGameOver()) {
    // console.log("game over but the player lost");
    if (game.player.hp > 0 && game.manaSpent < minManaSpent) {
      console.log(
        "found game over",
        game.manaSpent,
        game.log,
        game.player,
        game.boss
      );
      minManaSpent = game.manaSpent;
    }
    return minManaSpent;
  }

  const availableSpells = getAvailableSpells(game);

  if (availableSpells.length === 0) {
    return minManaSpent; // the boss won
  }

  for (const spell of availableSpells) {
    const newGame = new GameManager(
      { ...game.player },
      { ...game.boss },
      game.manaSpent,
      {},
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
const game = new GameManager(player, boss, 0, null, []);
const manaSpent = findOptimalManaSpent(game, Infinity);
console.log(manaSpent);
