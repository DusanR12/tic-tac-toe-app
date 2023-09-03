// If the game squares were numbered from 0 to 8.
const WIN_CONDITIONS = [
  [0, 1, 2], // first row
  [3, 4, 5], // second row
  [6, 7, 8], // third row
  [0, 3, 6], // first column
  [1, 4, 7], // second column
  [2, 5, 8], // third column
  [0, 4, 8], // first diagonal
  [2, 4, 6], // second diagonal
];
let BOARD_WIDTH = 3;
let movesTaken = 0;
let currentPlayerName;
let currentPlayerMark = 'X';

/* Components */ 
const xMark = document.getElementById('secondary-button-1');
const oMark = document.getElementById('secondary-button-2');
const newGameVsCpu = document.getElementById('primary-button-1');
const newGameVsPlayer = document.getElementById('primary-button-2');
const restartButton = document.getElementById('restart-button')
const newGameContainer = document.getElementById('container-1');
const gameContainer = document.getElementById('container-2');
const gameSquares = document.querySelectorAll('.game-square');
const winStateSection = document.querySelector('.win-state-section');
const overlay = document.querySelector('.overlay');

/* Text, colors etc... */
const turn = document.getElementById('dynamic-text-1-js');
const whoIsX = document.getElementById('dynamic-text-2-js');
const xWinsCount = document.getElementById('dynamic-text-3-js');
const tiesCount = document.getElementById('dynamic-text-4-js');
const whoIsO = document.getElementById('dynamic-text-5-js');
const oWinsCount = document.getElementById('dynamic-text-6-js');
const whoWon = document.getElementById('dynamic-text-7-js');
const whoTakesTheRound = document.getElementById('dynamic-text-8-js');
const dynamicMark = document.getElementById('dynamic-text-9-js');


newGameVsCpu.addEventListener('click', gameWithCpu);
newGameVsPlayer.addEventListener('click', gameWithPlayer);

xMark.addEventListener('click', player1IsX);
oMark.addEventListener('click', player1IsO);

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener('click' , () => {
    makeMove(gameSquare);
  });
});

restartButton.addEventListener('click', restartGame);

/* Feature to be added */
function gameWithCpu() {

}

function gameWithPlayer() {
  newGameContainer.classList.add('display-none'); 
  gameContainer.classList.remove('display-none');
}

function makeMove(gameSquare) {
   if (movesTaken % 2 !== 0) {
    gameSquare.textContent = 'O';
    gameSquare.classList.add('primary-2-clr');
    turn.textContent = 'X';
  } else {
    gameSquare.textContent = 'X'; 
    gameSquare.classList.add('primary-1-clr');
    turn.textContent = 'O';
  }
  gameSquare.disabled = true;
  movesTaken++;

  if (didPlayerWin()) {
    playerWon();
  } else if (movesTaken >= BOARD_WIDTH * BOARD_WIDTH) {
    tieGame();
  }
  else {
    currentPlayerName = currentPlayerName === 'player 1' ? 'player 2' : 'player 1';
    currentPlayerMark = currentPlayerMark === 'X' ? 'O' : 'X';
    console.log(`current player: ${currentPlayerName}`);
  } 
}

function player1IsX() {
  currentPlayerName = 'player 1';
  console.log(`current player: ${currentPlayerName}`);
}

function player1IsO() {
  currentPlayerName = 'player 2';

  whoIsX.textContent = '(P2)';
  whoIsO.textContent = '(P1)';
  console.log(`current player: ${currentPlayerName}`);
}

function didPlayerWin() {
  return WIN_CONDITIONS.some(condition => {
    return condition.every(gameSquarePosition => {
      return gameSquares[gameSquarePosition].textContent === currentPlayerMark;
    });
  });
};

function playerWon() {
  winStateSection.classList.remove('display-none');
  overlay.classList.remove('display-none');
  gameSquares.forEach(gameSquare => {
    gameSquare.disabled = true;
  });
  whoWon.textContent = `${currentPlayerName} wins`;
  dynamicMark.textContent = `${currentPlayerMark}`;

  if (currentPlayerMark === 'X') {
    whoTakesTheRound.classList.add('primary-1-clr');
  } else {
    whoTakesTheRound.classList.add('primary-2-clr');
    
  }

  console.log(`Game ended. The winner is ${currentPlayerName}`);
}

function tieGame() {
  winStateSection.classList.remove('display-none');
  overlay.classList.remove('display-none');
  restartButton.disabled = true;
  whoWon.classList.add('display-none');

  winStateSection.classList.add('gap-500', 'vertical-p-800');
  winStateSection.classList.remove('vertical-p-700');
  whoTakesTheRound.classList.add('accent-200-clr');
  whoTakesTheRound.textContent = 'round tied';

  console.log('Tie-game');
  
}

function restartGame() {
  currentPlayerMark = 'X';
  movesTaken = 0;
  gameSquares.forEach(gameSquare => {
    gameSquare.textContent = '';
    gameSquare.disabled = false;
  });
}