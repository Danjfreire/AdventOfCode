import { readFileSync } from "node:fs";

class Bot {
  constructor(number) {
    this.storage = [];
    this.number = number;
  }

  setTargets(low, high) {
    this.low = low;
    this.high = high;
  }

  push(value) {
    this.storage.push(value);
    this.deliver();
  }

  deliver() {
    if (this.low && this.high && this.storage.length === 2) {
      this.storage.sort((a, b) => a - b);

      if (this.storage[0] === 17 && this.storage[1] === 61) {
        console.log("Part 1: ", this.number);
      }

      this.high.push(this.storage.pop());
      this.low.push(this.storage.pop());
    }
  }
}

class Output {
  constructor(number) {
    this.value = number;
    this.number = number;
  }

  push(value) {
    this.value = value;
  }
}

class Factory {
  constructor() {
    this.bots = new Map();
    this.outputs = new Map();
  }

  configureBot(botNum, lowTarget, highTarget) {
    const bot = this.getBot(botNum);
    const low = lowTarget.type === "bot" ? this.getBot(lowTarget.number) : this.getOutput(lowTarget.number);
    const high = highTarget.type === "bot" ? this.getBot(highTarget.number) : this.getOutput(highTarget.number);

    bot.setTargets(low, high);
    bot.deliver();
  }

  getBot(botNum) {
    const bot = this.bots.get(botNum);
    if (bot) {
      return bot;
    }
    const newBot = new Bot(botNum);
    this.bots.set(botNum, newBot);

    return newBot;
  }

  getOutput(outputNum) {
    const output = this.outputs.get(outputNum);
    if (output) {
      return output;
    }
    const newOutput = new Output(outputNum);
    this.outputs.set(outputNum, newOutput);

    return newOutput;
  }

  sendValueToBot(value, botNum) {
    const bot = this.getBot(botNum);
    bot.push(value);
  }
}

function simulateFactory() {
  const content = readFileSync("../input.txt").toString();
  const instructions = content.split("\n");

  const factory = new Factory();
  for (const instruction of instructions) {
    const botConfig = instruction.match(/^bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)$/);

    if (botConfig) {
      const [_, botNum, lowType, lowNum, highType, highNum] = botConfig;
      const low = { type: lowType, number: +lowNum };
      const high = { type: highType, number: +highNum };

      factory.configureBot(+botNum, low, high);
    } else {
      const [_, value, botNum] = instruction.match(/^value (\d+) goes to bot (\d+)$/);
      factory.sendValueToBot(+value, +botNum);
    }
  }

  const output0 = factory.outputs.get(0).value;
  const output1 = factory.outputs.get(1).value;
  const output2 = factory.outputs.get(2).value;
  console.log("Part 2: ", output0 * output1 * output2);
}

simulateFactory();
