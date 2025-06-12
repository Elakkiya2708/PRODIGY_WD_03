const cells = document.querySelectorAll('.cell');

const statusText = document.getElementById('status');

const resetBtn = document.getElementById('reset');

const themeToggle = document.getElementById('theme-toggle');

const xWinsEl = document.getElementById('x-wins');

const oWinsEl = document.getElementById('o-wins');

let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let running = true;

let xWins = 0;

let oWins = 0;

const winConditions = [

  [0, 1, 2], [3, 4, 5], [6, 7, 8],

  [0, 3, 6], [1, 4, 7], [2, 5, 8],

  [0, 4, 8], [2, 4, 6]

];

cells.forEach(cell => cell.addEventListener('click', playerMove));

resetBtn.addEventListener('click', resetGame);

themeToggle.addEventListener('click', toggleTheme);

function playerMove() {

  const index = this.getAttribute('data-index');

  if (board[index] !== "" || !running || currentPlayer !== "X") return;

  makeMove(index, "X");
  checkWinner();

  if (running) {

    setTimeout(aiMove, 500);

  }

}

function aiMove() {

  const index = getBestMove();

  if (index === null) return;

  makeMove(index, "O");

  checkWinner();

}

function getBestMove() {

  // Try to win

  for (let i = 0; i < board.length; i++) {

    if (board[i] === "") {

      board[i] = "O";

      if (isWinner("O")) {

        board[i] = "";

        return i;

      }
      board[i] = "";

    }

  }

  // Block X

  for (let i = 0; i < board.length; i++) {

    if (board[i] === "") {

      board[i] = "X";

      if (isWinner("X")) {

        board[i] = "";

        return i;

      }

      board[i] = "";

    }

  }

  // Random move

  const empty = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);

  return empty.length > 0 ? empty[Math.floor(Math.random() * empty.length)] : null;

}

function isWinner(player) {

  return winConditions.some(([a, b, c]) => {

    return board[a] === player && board[b] === player && board[c] === player;

  });

}
function makeMove(index, player) {

  board[index] = player;

  cells[index].textContent = player;

  currentPlayer = player === "X" ? "O" : "X";

}

function checkWinner() {

  let won = false;

  for (let condition of winConditions) {

    const [a, b, c] = condition;

    if (board[a] && board[a] === board[b] && board[b] === board[c]) {

      highlightWinningCells(condition);

      won = true;

      break;

    }

  }

  if (won) {

    const winner = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `${winner} wins!`;

    if (winner === "X") xWinsEl.textContent = ++xWins;

    else oWinsEl.textContent = ++oWins;

    running = false;

  } else if (!board.includes("")) {

    statusText.textContent = "Draw!";

    running = false;

  }

}

function highlightWinningCells(indices) {

  indices.forEach(i => cells[i].classList.add('winning'));

}

function resetGame() {

  board = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {

    cell.textContent = "";
    cell.classList.remove('winning');

  });

  currentPlayer = "X";

  statusText.textContent = "";

  running = true;

}

function toggleTheme() {

  document.body.classList.toggle('dark');

}


     
 
    
