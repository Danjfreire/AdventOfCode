import { readFileSync } from "node:fs";

function getInstructions() {
  const text = readFileSync("../input.txt");
  const lines = text.toString().split("\n");

  const instructions = [];

  for (const line of lines) {
    const [code, p1, p2] = line.split(" ");
    instructions.push({
      code,
      p1,
      p2,
    });
  }

  return instructions;
}

function cpy(computer, p1, p2) {
  if (isNaN(p1)) {
    computer.registers[p2] = computer.registers[p1];
  } else {
    computer.registers[p2] = Number(p1);
  }
}

function inc(computer, p1) {
  computer.registers[p1] += 1;
}

function dec(computer, p1) {
  computer.registers[p1] -= 1;
}

function jnz(computer, p1, p2) {
  const x = isNaN(Number(p1)) ? computer.registers[p1] : Number(p1);
  if (x !== 0) {
    computer.pc += Number(p2) - 1;
  }
}

class Computer {
  constructor(instructions, registers) {
    this.instructions = instructions;
    this.registers = {
      a: registers.a,
      b: registers.b,
      c: registers.c,
      d: registers.d,
    };
    this.pc = 0;
  }

  async executeInstructions(instructionMap) {
    while (this.pc < this.instructions.length && this.pc >= 0) {
      const { code, p1, p2 } = this.instructions[this.pc];
      instructionMap[code](this, p1, p2);
      this.pc++;
    }
  }
}

const instructions = getInstructions();
const instructionMap = {
  cpy,
  inc,
  dec,
  jnz,
};
const computerp1 = new Computer(instructions, { a: 0, b: 0, c: 0, d: 0 });
await computerp1.executeInstructions(instructionMap);
console.log("Part 1: ", computerp1.registers.a);

const computerp2 = new Computer(instructions, { a: 0, b: 0, c: 1, d: 0 });
await computerp2.executeInstructions(instructionMap);
console.log("Part 2: ", computerp2.registers.a);
