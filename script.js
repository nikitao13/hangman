import { alphabet, wordArray } from "./words.js";

import {
  getRandomWord,
  renderKeyboard,
  updateGuess,
  keyInWord,
  resetWord,
} from "./functions.js";

let randomWord = "";
let guessArr = [];

const keyboardContainer = document.getElementById("kb");
const guessesDisplayed = document.getElementById("guessesDisplayed");

renderKeyboard(keyboardContainer, alphabet);

const initialiseGame = () => {
  randomWord = getRandomWord(wordArray);
  resetWord(guessesDisplayed, guessArr, randomWord.length);

  console.log(`word: ${randomWord}`);
  console.log(`attempts left: ${10 - guessArr.length}`);
};

initialiseGame();

const handleKeyPress = (key) => {
  updateGuess(guessesDisplayed, key, guessArr, randomWord);
};

console.log(`key "d" in word: ` + keyInWord("d", randomWord));
