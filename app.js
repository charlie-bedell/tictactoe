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
  console.log(cellVals);
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
  console.log(cellsArr);
  for (let i in winConditions) {
    if (allEqual(winConditions[i], cellsArr)) {
      return cellsArr[winConditions[i][0]];
    }
  }
  return false;
}

function endGame(winner) {
  cells = Array.from(document.getElementsByClassName("cell"));
  cells.map((x) => x.disabled = true);
  let turnTracker = document.getElementById("turn-tracker");
  turnTracker.innerText = `${winner} wins!`;
}

function handleTurn(event) {
  if (XTURN) {
    placeX(event);
    XTURN = !XTURN;
    document.getElementById("turn-tracker").innerText = XTURN ? "X's Turn" : "O's Turn";
  } else {
    placeO(event);
    XTURN = !XTURN;
    document.getElementById("turn-tracker").innerText = XTURN ? "X's Turn" : "O's Turn";
  }
  let winner = checkForWinner();
  console.log(winner);
  if ((winner == "O" ) || (winner == "X")) {
    endGame(winner);
  }
  
}


// -------------------- MAIN --------------------

populateBoard();
let cells = Array.from(document.getElementsByClassName("cell"));
cells.map((x) => x.addEventListener("click", handleTurn));
