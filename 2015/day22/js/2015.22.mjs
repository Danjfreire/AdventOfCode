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
    console.log("player casting ", spell.name);
    for (const effect in this.activeEffects) {
      this.activeEffects[effect].apply(this);
    }

    this.manaSpent += spell.manaCost;
    this.player.mana -= spell.manaCost;
    boss.hp -= spell.damage;
    player.hp += spell.healing;

    if (spell.effect) {
      this.activeEffects[spell.effect.name] = spell.effect;
    }

    for (const effect in this.activeEffects) {
      if (this.activeEffects[effect].duration === 0) {
        delete this.activeEffects[effect];
      }
    }
    this.log.push(spell.name);
  }

  bossTurn() {
    for (const effect in this.activeEffects) {
      this.activeEffects[effect].apply(this);
    }

    if (this.boss.hp <= 0) {
      return;
    }

    player.hp -= Math.max(1, boss.damage - player.armor);

    for (const effect in this.activeEffects) {
      if (this.activeEffects[effect].duration === 0) {
        delete this.activeEffects[effect];
      }
    }
  }

  takeTurn(spell) {
    // check if spell can be cast
    const hasMana = this.player.mana >= spell.manaCost;
    const hasEffect = spell.effect != null;
    const isEffectActive =
      hasEffect && this.activeEffects[spell.effect.name] != null;

    if (!hasMana || isEffectActive) {
      return this.manaSpent;
    }

    this.playerTurn(spell);
    this.bossTurn();

    return this.manaSpent;
  }

  printGameState() {
    console.log(
      `Player:{hp:${player.hp}, mana:${player.mana}} | Boss:{hp:${this.boss.hp}}`
    );
  }

  isGameOver() {
    return player.hp <= 0 || boss.hp <= 0;
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
    this.duration--;
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

function findOptimalManaSpent(game, minManaSpent) {
  if (game.isGameOver() || game.manaSpent >= minManaSpent) {
    return minManaSpent;
  }

  for (const spell of spellList) {
    const newGame = new GameManager(
      { ...game.player },
      { ...game.boss },
      game.manaSpent,
      { ...game.activeEffects },
      [...game.log]
    );

    const manaSpent = newGame.takeTurn(spell);

    if (!newGame.isGameOver() && manaSpent < minManaSpent) {
      minManaSpent = findOptimalManaSpent(newGame, manaSpent);
    }
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
