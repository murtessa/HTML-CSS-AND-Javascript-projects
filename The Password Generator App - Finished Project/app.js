const rangeCharacters = document.getElementById("range-char");
const numberCharacters = document.getElementById("number-char");
const formContainer = document.querySelector("#password-form");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const uppercaseEl = document.querySelector("#uppercase");
const passwordDisplay = document.querySelector("#password-display");

/* Inserting the Character Codes into arrays
Character Cheatsheet -> https://www.petefreitag.com/cheatsheets/ascii-codes/
*/
const lowercaseCharCodes = arrayLowToHigh(97, 122);
const numberCharCodes = arrayLowToHigh(48, 57);
const symbolCharCodes = arrayLowToHigh(33, 47)
  .concat(58, 64)
  .concat(91, 96)
  .concat(123.126);
const uppercaseCharCodes = arrayLowToHigh(65, 90);

// Synchronizing Range and Number Inputs
rangeCharacters.addEventListener("input", syncCharAmount);
numberCharacters.addEventListener("input", syncCharAmount);

function syncCharAmount(e) {
  const valueAmount = e.target.value;
  rangeCharacters.value = valueAmount;
  numberCharacters.value = valueAmount;
}

// Generating the password when the form is submitted
formContainer.addEventListener("submit", function (e) {
  e.preventDefault();
  const characterAmount = numberCharacters.value; // ok
  const includeUppercase = uppercaseEl.checked;
  const includeNumbers = numbersEl.checked;
  const includeSymbols = symbolsEl.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  // console.log(lowercaseCharCodes);
  let charCodes = lowercaseCharCodes;
  if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);
  if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
  if (includeUppercase) charCodes = charCodes.concat(uppercaseCharCodes);

  const passwordCharacters = [];
  for (let h = 0; h < characterAmount; h++) {
    let characterCodes =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCodes));
  }

  // console.log(passwordCharacters);
  return passwordCharacters.join("");
}

// Character Codes Looping Function
function arrayLowToHigh(low, high) {
  let array = [];

  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
