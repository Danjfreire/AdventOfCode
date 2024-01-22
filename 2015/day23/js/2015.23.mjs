import { readFileSync } from "node:fs";

function getInstructions() {
  const text = readFileSync("../input.txt");
  const lines = text.toString().split("\n");

  const instructions = [];
  const instPattern = /^(\w+)(?: (\w+))?(?:,? ([\+\-]\d+))?$/;

  for (const line of lines) {
    const match = line.match(instPattern);
    if (match) {
      const [_, inst, reg, offset] = match;
      //   console.log(`${line} : ${inst} ${reg} ${offset}`);
      instructions.push({
        code: inst,
        reg,
        offset: offset ? Number(offset) : 0,
      });
    }
  }

  return instructions;
}

function inc(computer, register) {
  computer.registers[register]++;
}

function hlf(computer, register) {
  computer.registers[register] = computer.registers[register] / 2;
}

function tpl(computer, register) {
  computer.registers[register] = computer.registers[register] * 3;
}

function jmp(computer, register, offset) {
  computer.pc += offset - 1;
}

function jie(computer, register, offset) {
  if (computer.registers[register] % 2 === 0) {
    computer.pc += offset - 1;
  }
}

function jio(computer, register, offset) {
  if (computer.registers[register] === 1) {
    computer.pc += offset - 1;
  }
}

class Computer {
  constructor(instructions, a, b) {
    this.instructions = instructions;
    this.registers = {
      a: a,
      b: b,
    };
    this.pc = 0;
  }

  executeInstructions(instructionMap) {
    while (this.pc < this.instructions.length && this.pc >= 0) {
      const { code, reg, offset } = this.instructions[this.pc];
      instructionMap[code](this, reg, offset);
      this.pc++;
    }
  }
}

const instructions = getInstructions();
const instructionMap = {
  inc,
  hlf,
  tpl,
  jmp,
  jie,
  jio,
};
const computerp1 = new Computer(instructions, 0, 0);
const computerp2 = new Computer(instructions, 1, 0);
computerp1.executeInstructions(instructionMap);
computerp2.executeInstructions(instructionMap);
console.log("Part 1: ", computerp1.registers.b);
console.log("Part 2: ", computerp2.registers.b);
