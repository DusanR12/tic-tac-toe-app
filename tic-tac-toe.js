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
  let currentPlayer = 1;
  let movesTaken = 0;

  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--light-blue');
  const secondaryColor = getComputedStyle(root).getPropertyValue('--light-yellow');
  const dynamicHeader = document.getElementById('game-heading');
  const gameSquares = document.querySelectorAll('.game-square');
  const restartButton = document.getElementById('restart-button');

  
  gameSquares.forEach((gameSquare, i) => {
    gameSquare.addEventListener('click' , () => {
      makeMove(gameSquare);
    });
  });
  
  restartButton.addEventListener('click', restartGame);
  
  function makeMove(gameSquare) {
     if (currentPlayer === 1) {
      gameSquare.textContent = 'X';
      gameSquare.style.color = primaryColor;
     } else {
      gameSquare.textContent = 'O';
      gameSquare.style.color = secondaryColor;
     }
    gameSquare.disabled = true;
    movesTaken++;
  
    if (didPlayerWin()) {
      dynamicHeader.textContent = `Player ${currentPlayer} Won!`;
      endGame();
    } else if (movesTaken >= BOARD_WIDTH * BOARD_WIDTH) {
      dynamicHeader.textContent = 'Tie Game!';
      restartButton.style.display = 'block';
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      setCurrentPlayerHeader();
    }
  }
  
  function didPlayerWin() {
    const relevantText = currentPlayer === 1 ? 'X' : 'O';
    return WIN_CONDITIONS.some(condition => {
      return condition.every(gameSquarePosition => {
        return gameSquares[gameSquarePosition].textContent === relevantText;
      });
    });
  };
  
  function endGame() {
    restartButton.style.display = 'block';
    gameSquares.forEach(gameSquare => {
      gameSquare.disabled = true;
    });
  }
  
  function setCurrentPlayerHeader() {
    dynamicHeader.textContent = `Player ${currentPlayer}'s Turn`;
  }
  
  function restartGame() {
    currentPlayer = 1;
    movesTaken = 0;
    setCurrentPlayerHeader();
    gameSquares.forEach(gameSquare => {
      gameSquare.textContent = '';
      gameSquare.disabled = false;
    });
    restartButton.style.display = 'none';
  }
  
  
  
  