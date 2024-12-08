// RANDOM WORD SELECTION LOGIC
const genRandomIndex = (maxRange) => Math.floor(Math.random() * maxRange);

export const getRandomWord = (arr) => {
  const newIndex = genRandomIndex(arr.length);
  return arr[newIndex];
};

// GAME LOGIC
const gameWon = () => console.log("GAME WON!");
const gameLost = () => console.log("game lost...");

export const keyInWord = (key, word) =>
  key ? word.toLowerCase().includes(key.toLowerCase()) : false;

export const isWordGuessed = (guessArr, randomWord) => {
  const word = guessArr.join("");
  return word === randomWord;
};

const allGuessesUsed = (arr) => arr.length >= 10;

export const resetWord = (el, arr, wordLength) => {
  el.innerText = "_ ".repeat(wordLength);
  arr.length = 0;
};

// GAME RENDERING LOGIC
export const updateGuess = (el, key, arr, randomWord) => {
  let currentState = el.innerText;
  el.innerText = currentState + key;
  arr.push(key);
  if (isWordGuessed(arr, randomWord)) {
    gameWon();
  } else if (allGuessesUsed(arr)) {
    gameLost();
  }
};

// RENDERING LOGIC FOR KEYBOARD
const newKey = (el, keyValue) => {
  let rowContainer = el.querySelector(".kb__row:last-child");

  if (keyValue === "Q" || keyValue === "A" || keyValue === "Z") {
    rowContainer = document.createElement("div");
    rowContainer.className = "kb__row";
    el.append(rowContainer);
  }

  const newDiv = document.createElement("div");
  newDiv.className = "kb__k";
  newDiv.innerHTML = `<span>${keyValue}</span>`;

  rowContainer.append(newDiv);
};

export const renderKeyboard = (el, arr) => {
  arr.forEach((key) => {
    newKey(el, key);
  });
};
