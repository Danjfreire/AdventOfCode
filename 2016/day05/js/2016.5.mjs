import md5 from "md5";

function findPassword(input, hashStart, isPart2) {
  const password = new Array(8).fill("_");
  let discoveredChars = 0;
  let num = 0;
  let inputPlusNum = "";
  let hash = "";

  console.log("decrypting...");
  while (discoveredChars !== 8) {
    hash = md5(`${input}${num}`);

    if (hash.startsWith(hashStart)) {
      const char = hash[hashStart.length];
      if (isPart2) {
        if (password[+char] === "_") {
          password[+char] = hash.charAt(6);
          discoveredChars++;
        }
      } else {
        password[discoveredChars] = char;
        discoveredChars++;
      }
    }

    num++;
  }

  return password.join("");
}

const doorId = "ffykfhsq";
const hashStart = "00000";
console.log("Part 1 :", findPassword(doorId, hashStart, false));
console.log("Part 2 :", findPassword(doorId, hashStart, true));
