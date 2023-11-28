let XTURN = true;


function createCell(id) {
  let cell = document.createElement("button");
  cell.id = id;
  cell.classList.add("cell");
  return cell;
}


function populateBoard() {
  let board = document.getElementById("board");
  for (let i = 0; i < 9; i++) {
    board.appendChild(createCell(i));
  }
}


function placeX(event) {
  let cell = document.getElementById(event.target.id);
  if (cell.innerText == "") {
    cell.innerText = "X";
  }
}


function placeO(event) {
  let cell = document.getElementById(event.target.id);
  if (cell.innerText == "") {
    cell.innerText = "O";
  }
}


function cellsToArray() {
  let cells = Array.from(document.getElementsByClassName("cell"));
  cells = cells.map((x) => x.innerText);
  return cells;
}


function allEqual(idsArr, cellsArr) {
  let cellVals = [cellsArr[idsArr[0]],
                  cellsArr[idsArr[1]],
                  cellsArr[idsArr[2]]];
  let uniqueVals = new Set(cellVals);
  uniqueVals = Array.from(uniqueVals);
  
  return uniqueVals.length == 1 && uniqueVals[0] !== "" ? true : false;
}


function checkForWinner() {
  // winConditions are ids of the board array that would be a win if they were
  // all equal
  //[0 1 2
  // 3 4 5
  // 6 7 8]
  let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let cellsArr = cellsToArray();
  for (let i in winConditions) {
    if (allEqual(winConditions[i], cellsArr)) {
      return cellsArr[winConditions[i][0]];
    }
  }
  return false;
}


function endGame(endGameText) {
  let cells = Array.from(document.getElementsByClassName("cell"));
  cells.map((x) => x.disabled = true);
  let turnTracker = document.getElementById("turn-tracker");
  turnTracker.innerText = endGameText;
}

function isTie() {
  let cells = cellsToArray();
  if (!cells.includes("")) {
    return true;
  } else {
    return false;
  }
}

function updateTurnText(event) {
  let turnTracker = document.getElementById("turn-tracker");
  if (event.target.textContent == "") {
    turnTracker.textContent = XTURN ? "O's turn" : "X's turn";
  }
}

function handleTurn(event) {
  updateTurnText(event);
  
  if ((XTURN) && (event.target.textContent == "")) {
    placeX(event);
    XTURN = !XTURN;
  } else if (event.target.textContent == "") {
    placeO(event);
    XTURN = !XTURN;
  }
  let winner = checkForWinner();
  if ((winner == "O" ) || (winner == "X")) {
    endGame(`${winner} wins!`);
  } else if (isTie()) {
    endGame("It's a tie!");
  }
  
}

function newGame(event) {
  document.getElementById("board").innerHTML = "";
  XTURN = true;  
  populateBoard();
  let cells = Array.from(document.getElementsByClassName("cell"));
  cells.map((x) => x.addEventListener("click", handleTurn));
  document.getElementById("turn-tracker").textContent = "X's turn";
}


// -------------------- MAIN --------------------

populateBoard();

let board = document.getElementById("board");
board.addEventListener('click', handleTurn);

document.getElementById('restart').addEventListener('click', newGame);
