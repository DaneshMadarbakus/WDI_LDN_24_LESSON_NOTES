window.onload = function(){
  new SudokuSolver();
};

function SudokuSolver() {
  var BOARD_SIZE = 9;
  var BOX_SIZE   = 3;
  var EMPTY      = '';
  var BOARD      = [];

  drawBoard();

  function solve() {
    BOARD = document.getElementsByTagName('input');
    if (!guess(0)) return alert('Sorry, solution not found!');
  }

  function guess(index) {
    var row = Math.floor(index / BOARD_SIZE);
    var col = index % BOARD_SIZE;
    if (index >= BOARD.length) return true;

    if (BOARD[index].value !== EMPTY) return guess(index + 1);
    for (var num = 1; num <= BOARD_SIZE; num++) {
      if (check(num, row, col)) {
        BOARD[index].value = num;
        BOARD[index].classList = 'solution';
        if (guess(index + 1)) return true;
      }
    }

    BOARD[index].value = EMPTY;
    return false;
  }

  function check(num, row, col) {
    var rowIndex, colIndex, boxIndex;
    var r = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    var c = Math.floor(col / BOX_SIZE) * BOX_SIZE;

    for (var i = 0; i < BOARD_SIZE; i++) {
      rowIndex = (row * BOARD_SIZE) + i;
      colIndex = col + (i * BOARD_SIZE);
      boxIndex = (r + Math.floor(i / BOX_SIZE)) * BOARD_SIZE + c + (i % BOX_SIZE);

      if (num === BOARD[rowIndex].value ||
          num === BOARD[colIndex].value ||
          num === BOARD[boxIndex].value) return false;
    }

    return true;
  }

  function drawBoard() {
    var body  = document.body;
    // Make the table and add the table to the document
    var table = document.createElement('table');
    body.appendChild(table);

    // Loop through the table and create input boxes
    for (var row=0; row < BOARD_SIZE; row++) {
      var tr = document.createElement('tr');
      for (var col=0; col < BOARD_SIZE; col++) {
        var td = document.createElement('td');
        tr.appendChild(td);

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('size', '1');
        input.setAttribute('maxlength', '1');
        td.appendChild(input);
      }
      table.appendChild(tr);
    }

    var button = document.createElement('button');
    button.innerHTML = 'Solve';
    button.addEventListener('click', solve);
    body.appendChild(button);
  }
}
