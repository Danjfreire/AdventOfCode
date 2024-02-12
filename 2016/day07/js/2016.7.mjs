import { readFileSync } from "node:fs";

function getIps() {
  const content = readFileSync("../input.txt").toString();

  return content.split("\n");
}

function hasAbba(sequence) {
  for (let i = 0; i < sequence.length - 2; i++) {
    if (sequence[i] !== sequence[i + 1] && sequence[i + 1] === sequence[i + 2] && sequence[i] === sequence[i + 3]) {
      return true;
    }
  }
  return false;
}

function supportsSSL(hpSequences, nonHpSequences) {
  for (let i = 0; i < nonHpSequences.length; i++) {
    for (let j = 0; j < nonHpSequences[i].length - 1; j++) {
      if (
        nonHpSequences[i][j] !== nonHpSequences[i][j + 1] &&
        nonHpSequences[i][j] === nonHpSequences[i][j + 2] &&
        hpSequences.find((s) => {
          return s.includes(`${nonHpSequences[i][j + 1]}${nonHpSequences[i][j]}${nonHpSequences[i][j + 1]}`);
        })
      ) {
        return true;
      }
    }
  }

  return false;
}

function supportsAbba(hpSequences, nonHpSequences) {
  for (const sequence of hpSequences) {
    if (hasAbba(sequence)) {
      return false;
    }
  }

  for (const sequence of nonHpSequences) {
    if (hasAbba(sequence)) {
      return true;
    }
  }

  return false;
}

function getHypernetSequences(ip) {
  const hpSequencePattern = /\[(\w+)\]/g;
  const hpSequences = [...ip.matchAll(hpSequencePattern)].map(([_, seq]) => seq);

  return hpSequences;
}

function getNonHypernetSequences(ip) {
  const p1Pattern = /(\w+)\[/g;
  const p2Pattern = /\](\w+)/g;
  const p1Matches = [...ip.matchAll(p1Pattern)];
  const p2Matches = [...ip.matchAll(p2Pattern)];

  const matches = [];
  p1Matches.forEach(([_, m]) => matches.push(m));
  p2Matches.forEach(([_, m]) => matches.push(m));

  // console.log(matches);
  return matches;
}

function getIpConfig(ip) {
  const hpSequences = getHypernetSequences(ip);
  const nonHpSequences = getNonHypernetSequences(ip);

  return {
    ssl: supportsSSL(hpSequences, nonHpSequences),
    abba: supportsAbba(hpSequences, nonHpSequences),
  };
}

const IPS = getIps();
console.log("Part 1: ", IPS.map(getIpConfig).filter((cfg) => cfg.abba).length);
console.log("Part 2: ", IPS.map(getIpConfig).filter((cfg) => cfg.ssl).length);
