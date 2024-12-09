const genRandomIndex = (maxRange) => Math.floor(Math.random() * maxRange);

export const getRandomWord = (arr) => {
  const newIndex = genRandomIndex(arr.length);
  return arr[newIndex];
};

export const keyInWord = (key, word) =>
  key ? word.toLowerCase().includes(key.toLowerCase()) : false;

export const isWordGuessed = (guessArr, randomWord) => {
  const word = guessArr.join("");
  return word === randomWord;
};

export const resetWord = (el, arr, wordLength) => {
  el.innerText = "_ ".repeat(wordLength);
  arr.length = 0;
};

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

  return newDiv;
};

export const renderKeyboard = (el, arr, handleKeyPress) => {
  arr.forEach((key) => {
    const keyEl = newKey(el, key);
    keySelection(keyEl, handleKeyPress);
  });
};

export const keySelection = (keyEl, handleKeyPress) => {
  keyEl.addEventListener("click", () => {
    const keyValue = keyEl.querySelector("span").innerText;
    handleKeyPress(keyValue);
  });
};
