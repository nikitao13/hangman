import { alphabet, wordArray } from "./words.js";

import {
  getRandomWord,
  renderKeyboard,
  keyInWord,
  resetWord,
} from "./functions.js";

let randomWord = "";
let guessArr = [];
let incorrectGuesses = 0;

const keyboardContainer = document.getElementById("kb");
const guessesDisplayed = document.querySelector(".guesses__display");
const hangmanImage = document.querySelector(".img-container__img");

const updateHangmanImage = (guessCount) => {
  hangmanImage.src = `./imgs/h-${guessCount}.jpg`;
};

const handleKeyPress = (key) => {
  if (keyInWord(key, randomWord)) {
    updateGuess(guessesDisplayed, key, guessArr, randomWord);
  } else {
    incorrectGuesses++;
    updateHangmanImage(incorrectGuesses);

    if (incorrectGuesses === 10) {
      gameLost();
      return;
    }
  }

  const pressedKey = Array.from(
    keyboardContainer.querySelectorAll(".kb__k")
  ).find((k) => k.textContent.trim() === key);
  if (pressedKey) {
    pressedKey.classList.add("disabled");
  }
};

const gameWon = () => {
  alert(`You won! The word was: ${randomWord}`);
  initialiseGame();
};

const gameLost = () => {
  setTimeout(() => {
    alert(`You lost! The word was: ${randomWord}`);
    initialiseGame();
  }, 500);
};

const updateGuess = (el, key, arr, randomWord) => {
  let currentState = el.innerText.split(" ");

  const indexesToReveal = randomWord
    .toLowerCase()
    .split("")
    .reduce((acc, char, index) => {
      if (char === key.toLowerCase()) acc.push(index);
      return acc;
    }, []);

  indexesToReveal.forEach((index) => {
    currentState[index] = randomWord[index];
  });

  el.innerText = currentState.join(" ");
  arr.push(key);

  if (!currentState.includes("_")) {
    setTimeout(() => {
      gameWon();
    }, 500);
  }
};

const initialiseGame = () => {
  randomWord = getRandomWord(wordArray);
  guessArr = [];
  incorrectGuesses = 0;
  updateHangmanImage(incorrectGuesses);

  keyboardContainer.innerHTML = "";

  resetWord(guessesDisplayed, guessArr, randomWord.length);

  renderKeyboard(keyboardContainer, alphabet, handleKeyPress);
};

initialiseGame();
