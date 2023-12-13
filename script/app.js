let hangManImg = document.querySelector(".hangman__box img");
let wordDisplay = document.querySelector(".word__display");
let keyBoard = document.querySelector(".keyboard");
let guessText = document.querySelector(".guesses__text b");
let gameModal = document.querySelector(".game__modal");
let playAgainBtn = document.querySelector(".play__again");
let currentWord,
  correctLetters = [],
  wrongGuessCount = 0;
let maxGuess = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangManImg.src = `images/hangman-${wrongGuessCount}.svg`;
  guessText.innerText = `${wrongGuessCount} / ${maxGuess}`;
  keyBoard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => ` <li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWords = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint__text b").innerText = hint;
  resetGame();
  wordDisplay.innerHTML = word
    .split("")
    .map(() => ` <li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You Found The Word:`
      : `The Correct Word Was:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  clickedLetter = clickedLetter.toLowerCase();
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  }
   else {
    wrongGuessCount++;
    hangManImg.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessText.innerText = `${wrongGuessCount} / ${maxGuess}`;
  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Dynamic keyboard 
for (let charCode = 65; charCode <= 90; charCode++) {
  let letter = String.fromCharCode(charCode);
  let button = document.createElement("button");
  button.textContent = letter;
  keyBoard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(charCode))
  );
}

getRandomWords();
playAgainBtn.addEventListener("click", getRandomWords);
