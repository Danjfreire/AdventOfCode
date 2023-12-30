const FORBIDDEN = ["i", "o", "l"];

/**
 * @param {string} currentPassword
 * @returns {boolean}
 */
function isValid(passwordArray) {
  const hasForbidden = FORBIDDEN.some((char) => passwordArray.includes(char));

  if (hasForbidden) {
    return false;
  }

  let hasIncreasingStraight = false;
  let consideredPairs = [];
  let pairCount = 0;

  let currentCode;
  let previousCode;
  let prePreviousCode;
  for (let i = 1; i < passwordArray.length; i++) {
    currentCode = passwordArray[i].charCodeAt(0);
    previousCode = passwordArray[i - 1].charCodeAt(0);

    // check if it is a two pair sequence
    if (
      currentCode == previousCode &&
      !consideredPairs.includes(passwordArray[i])
    ) {
      pairCount++;
      consideredPairs.push(passwordArray[i]);
    }

    // check if it is an increasing straight
    if (i >= 2) {
      prePreviousCode = passwordArray[i - 2].charCodeAt("0");
      if (
        currentCode - previousCode === 1 &&
        previousCode - prePreviousCode === 1
      ) {
        hasIncreasingStraight = true;
      }
    }
  }

  return hasIncreasingStraight && pairCount >= 2;
}

/**
 * @param {string} currentPassword
 * @returns {string} next valid password
 */
function getNextValidPassword(currentPassword) {
  const min = "a".charCodeAt(0);
  const max = "z".charCodeAt(0);

  const passwordArray = currentPassword.split("");
  let isPasswordValid = false;

  while (!isPasswordValid) {
    // 1 - Increment password
    let i = passwordArray.length - 1;
    while (i >= 0) {
      const charCode = passwordArray[i].charCodeAt(0);
      if (charCode === max) {
        passwordArray[i] = String.fromCharCode(min);
        i--;
      } else {
        passwordArray[i] = String.fromCharCode(charCode + 1);
        break;
      }
    }

    // 2 - Check if password is valid
    isPasswordValid = isValid(passwordArray);
  }

  return passwordArray.join("");
}

const password = "hepxcrrq";
const nextPassword = getNextValidPassword(password);
console.log("Next valid Password : ", nextPassword);
