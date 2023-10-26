// If the game squares were numbered from 0 to 8.
const WIN_CONDITIONS = [
  [0, 1, 2], // first row
  [3, 4, 5], // second row
  [6, 7, 8], // third row
  [0, 3, 6], // first column
  [1, 4, 7], // second column
  [2, 5, 8], // third column
  [0, 4, 8], // first diagonal
  [2, 4, 6] // second diagonal
];

let player1Mark;
let currentPlayerName;
let BOARD_WIDTH = 3;
let movesTaken = 0;
let currentPlayerMark = "X";
let tie = false;

/* Components */
const newGameVsCpuButton = document.getElementById("primary-button-1");
const newGameVsPlayerButton = document.getElementById("primary-button-2");
const xMarkButton = document.getElementById("secondary-button-1");
const oMarkButton = document.getElementById("secondary-button-2");
const quitButton = document.getElementById("accent-button-1");
const nextRoundButton = document.getElementById("accent-button-2");
const restartButton = document.getElementById("restart-button");
const newGameContainer = document.getElementById("container-1");
const gameContainer = document.getElementById("container-2");
const gameSquares = document.querySelectorAll(".dr-button-game-square");
const winStateSection = document.getElementById("section");
const overlay = document.getElementById("overlay");

/* Text, colors etc... */
const turn = document.getElementById("dynamic-text-1-js");
const whoIsX = document.getElementById("dynamic-text-2-js");
const xWinsCount = document.getElementById("dynamic-text-3-js");
const tiesCount = document.getElementById("dynamic-text-4-js");
const whoIsO = document.getElementById("dynamic-text-5-js");
const oWinsCount = document.getElementById("dynamic-text-6-js");
const whoWon = document.getElementById("dynamic-text-7-js");
const whoTakesTheRound = document.getElementById("dynamic-text-8-js");
const dynamicMark = document.getElementById("dynamic-text-9-js");
const roundWonOrTied = document.getElementById("dynamic-text-10-js");

newGameVsCpuButton.addEventListener("click", gameWithCpu);
newGameVsPlayerButton.addEventListener("click", gameWithPlayer);
xMarkButton.addEventListener("click", player1IsX);
oMarkButton.addEventListener("click", player1IsO);
nextRoundButton.addEventListener("click", nextRound);
quitButton.addEventListener("click", quit);
restartButton.addEventListener("click", restartGame);

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener("click", () => {
    makeMove(gameSquare);
  });
});

newGameVsCpuButton.disabled = true;
newGameVsPlayerButton.disabled = true;

function player1IsX() {
  xMarkButton.disabled = true;
  oMarkButton.disabled = false;
  currentPlayerName = "player 1";
  player1Mark = "X";
  newGameVsCpuButton.disabled = false;
  newGameVsPlayerButton.disabled = false;
}

function player1IsO() {
  oMarkButton.disabled = true;
  xMarkButton.disabled = false;
  currentPlayerName = "player 2";
  player1Mark = "O";
  whoIsX.textContent = "(P2)";
  whoIsO.textContent = "(P1)";
  newGameVsCpuButton.disabled = false;
  newGameVsPlayerButton.disabled = false;
}

/* Feature to be added */
function gameWithCpu() {
  /* Feature */
}

function gameWithPlayer() {
  newGameContainer.classList.add("dr-display-none");
  gameContainer.classList.remove("dr-display-none");
}

function makeMove(gameSquare) {
  switch (currentPlayerMark) {
    case "X":
      gameSquare.textContent = "X";
      gameSquare.classList.add("dr-clr-primary-500");
      turn.textContent = "O";
      break;
    case "O":
      gameSquare.textContent = "O";
      gameSquare.classList.add("dr-clr-primary-400");
      turn.textContent = "X";
      break;
    default:
      throw new Error("Something went wrong");
  }

  gameSquare.disabled = true;
  movesTaken++;

  if (didPlayerWin()) {
    playerWon();
  } else if (movesTaken >= BOARD_WIDTH * BOARD_WIDTH) {
    tieGame();
  } else {
    currentPlayerName =
      currentPlayerName === "player 1" ? "player 2" : "player 1";
    currentPlayerMark = currentPlayerMark === "X" ? "O" : "X";
  }
}

function didPlayerWin() {
  return WIN_CONDITIONS.some((condition) => {
    return condition.every((gameSquarePosition) => {
      return gameSquares[gameSquarePosition].textContent === currentPlayerMark;
    });
  });
}

function playerWon() {
  winStateSection.classList.remove("dr-display-none");
  overlay.classList.remove("dr-display-none");
  restartButton.disabled = true;
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
  whoWon.textContent = `${currentPlayerName} wins`;
  dynamicMark.textContent = `${currentPlayerMark}`;

  if (currentPlayerMark === "X") {
    whoTakesTheRound.classList.add("dr-clr-primary-500");
  } else {
    whoTakesTheRound.classList.add("dr-clr-primary-400");
  }
}

function tieGame() {
  tie = true;
  winStateSection.classList.remove("dr-display-none");
  overlay.classList.remove("dr-display-none");
  restartButton.disabled = true;
  whoWon.classList.add("dr-display-none");

  winStateSection.classList.add("dr-gap-9", "dr-padding-block-11");
  winStateSection.classList.remove("dr-padding-block-10");
  whoTakesTheRound.classList.add("dr-clr-accent-200");
  whoTakesTheRound.removeChild(dynamicMark);
  roundWonOrTied.textContent = "round tied";
}

function restartGame() {
  reset();
}

function nextRound() {
  /* Score */
  if (tie) {
    tiesCount.textContent++;
  } else if (currentPlayerMark === "X") {
    xWinsCount.textContent++;
  } else {
    oWinsCount.textContent++;
  }
  reset();
}

function quit() {
  newGameVsPlayerButton.disabled = true;
  newGameVsCpuButton.disalbed = true;
  tiesCount.textContent = "0";
  xWinsCount.textContent = "0";
  oWinsCount.textContent = "0";
  player1Mark = undefined;
  gameContainer.classList.add("dr-display-none");
  newGameContainer.classList.remove("dr-display-none");
  reset();
}

function reset() {
  winStateSection.classList.add("dr-display-none");
  overlay.classList.add("dr-display-none");
  movesTaken = 0;
  currentPlayerMark = "X";
  currentPlayerName = undefined;
  turn.textContent = "X";
  tie = false;
  xMarkButton.disabled = false;
  oMarkButton.disabled = false;
  restartButton.disabled = false;
  whoWon.classList.remove("dr-display-none");
  whoTakesTheRound.insertBefore(dynamicMark, whoTakesTheRound.firstChild);
  whoTakesTheRound.classList.remove("dr-clr-primary-500", "dr-clr-primary-400", "dr-clr-accent-200");
  winStateSection.classList.remove("dr-gap-9", "dr-padding-block-11");
  winStateSection.classList.add("dr-padding-block-10");
  winStateSection.classList.remove("dr-clr-accent-200");
  roundWonOrTied.textContent = "takes the round";
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = false;
    gameSquare.textContent = "";
    gameSquare.classList.remove("dr-clr-primary-500", "dr-clr-primary-400");
  });

  switch (player1Mark) {
    case "X":
      player1IsX();
      break;
    case "O":
      player1IsO();
      break;
  }
}

// function saveGameState() {
//   const gameState = {
//     newGameContainerDisplayNone: newGameContainer.classList.contains("dr-display-none"),
//     gameContainerDisplayNone: gameContainer.classList.contains("dr-display-none"),
//     squares: [],
//   }

//   gameSquares.forEach((gameSquare) => {
//     gameState.squares.push(gameSquare.textContent);
//   });

//   localStorage.setItem('tic-tac-toe', JSON.stringify(gameState));
// }

// function loadGameState() {
//   const gameState = JSON.parse(localStorage.getItem('tic-tac-toe'));
//   return gameState || null;
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const gameState = loadGameState();
//   if (gameState) {
//       if(gameState.gameContainerDisplayNone === false) {
//         newGameContainer.classList.add('dr-display-none')
//         gameContainer.classList.remove('dr-display-none');
//       }

//       gameSquares.forEach((gameSquare, i) => {
//         gameSquare.textContent = gameState.squares[i];
//         gameSquare.textContent === 'X' ? gameSquare.classList.add("dr-clr-primary-500") : gameSquare.classList.add("dr-clr-primary-400");
//       });
//   }
// })

console.log();
