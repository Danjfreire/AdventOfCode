import { readFileSync } from "node:fs";

function decryptRoom(name, sectorId) {
  const topCharcode = 122;
  const minCharcode = 97;
  let decrypted = "";
  for (let i = 0; i < name.length; i++) {
    if (name.charAt(i) === "-") {
      decrypted += " ";
      continue;
    }

    let charCode = name.charCodeAt(i);

    for (let j = 0; j < sectorId; j++) {
      if (charCode === topCharcode) {
        charCode = minCharcode;
      } else {
        charCode++;
      }
    }
    decrypted += String.fromCharCode(charCode);
  }

  // console.log(decrypted, sectorId);
  return decrypted;
}

function getRealRooms() {
  const content = readFileSync("../input.txt").toString();
  const lines = content.split("\n");
  const validRooms = [];

  const pattern = /(.*)(\d{3})\[(\w+)\]/;
  for (const line of lines) {
    const [_, roomName, sectorId, checksum] = line.match(pattern);

    const map = new Map();

    for (let i = 0; i < roomName.length; i++) {
      const char = roomName.charAt(i);
      if (char === "-") {
        continue;
      }
      const ocurrences = map.get(char);
      ocurrences !== undefined ? map.set(char, ocurrences + 1) : map.set(char, 1);
    }

    const letterEntries = [];
    for (const [key, value] of map) {
      letterEntries.push({ letter: key, count: value });
    }

    letterEntries.sort((l1, l2) => l2.count - l1.count || l1.letter.localeCompare(l2.letter));

    const generatedChecksum = letterEntries
      .map((e) => e.letter)
      .slice(0, 5)
      .join("");
    if (generatedChecksum === checksum) {
      validRooms.push({ roomName, sectorId: +sectorId });
    }
  }

  return validRooms;
}

const rooms = getRealRooms();
const p1 = rooms.reduce((prev, cur) => {
  return prev + cur.sectorId;
}, 0);
const p2 = rooms.find((room) => decryptRoom(room.roomName, room.sectorId).includes("north")).sectorId;
console.log("Part 1 :", p1);
console.log("Part 1 :", p2);
