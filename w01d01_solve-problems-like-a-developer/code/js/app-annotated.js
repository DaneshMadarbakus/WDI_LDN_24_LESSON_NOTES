// 0  1  2  | 3  4  5  | 6  7   8
// 9  10 11 | 12 13 14 | 15 16 17
// 18 19 20 | 21 22 23 | 24 25 25
// -- -- --   -- -- --   -- -- --
// 26 27 28 | 29 30 31 | 32 33 34
// 35 36 37 | 38 39 40 | 41 42 43
// 44 45 46 | 47 48 49 | 50 51 52
// -- -- --   -- -- --   -- -- --
// 53 54 54 | 55 56 57 | 58 59 60
// 61 62 63 | 64 65 66 | 67 68 69
// 70 71 72 | 73 74 75 | 76 77 78


window.onload = function(){
  new SudokuSolver();
};

function SudokuSolver() {
  var BOARD_SIZE = 9;
  var BOX_SIZE   = 3;
  var EMPTY      = '';
  var BOARD      = [];

  // Create the board
  drawBoard();

  function solve() {
    // Get all of the inputs on the page
    BOARD = document.getElementsByTagName('input');

    // Starting off with the 0th index, guess all of the other squares
    if (!guess(0)) return alert('Sorry, solution not found!');
  }

  // Recursively test all candidate numbers for a given cell until the BOARD is complete.
  function guess(index) {
    // Get the row of this index compared to the large box,
    // e.g. 32nd index cell is in the 3rd row (0-indexed)
    var row = Math.floor(index / BOARD_SIZE);
    // Get the column of this index compared to the large box,
    // e.g. 32nd index cell is in the 5th column (0-indexed)
    var col = index % BOARD_SIZE;

    // If the index is higher than the length of the BOARD,
    // then return true because the BOARD is complete
    if (index >= BOARD.length) return true;

    // If the inputted value found at that index is not empty,
    // then move on and guess the next cell
    if (BOARD[index].value !== EMPTY) return guess(index + 1);

    // Looop through the all numbers between 1 and 9
    // row and col don't change
    for (var num = 1; num <= BOARD_SIZE; num++) {
      // Check if this number
      if (check(num, row, col)) {
        // Set the value of this cell to be this number
        BOARD[index].value = num;
        // Add a red colour to the solution squares
        BOARD[index].classList = 'solution';

        // Color the squares when they have been solved with a delay.
        window.setTimeout(function(){
          BOARD[index].style.background = 'blue';
        }, 300);

        // If the algorithm can guess the next index correctly then return true
        if (guess(index + 1)) return true;
      }
    }

    // No "further" solution could be found so empty this square
    BOARD[index].value = EMPTY;

    // Return false
    return false;
  }

  // Variables we're passing into this function
  // - num: A candidate number between 1 & 9
  // - row: The index of the row of the large grid
  // - col: The index of the col of the large grid
  function check(num, row, col) {
    // Create empty variables for the row, colum and box indexes
    var rowIndex, colIndex, boxIndex;
    // Calculate the row of that particular small box?
    var r = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    // Calculate the column of that particular small box?
    var c = Math.floor(col / BOX_SIZE) * BOX_SIZE;

    // Loop through the 9 times and check
    for (var i = 0; i < BOARD_SIZE; i++) {
      rowIndex = (row * BOARD_SIZE) + i;
      console.log(rowIndex);
      colIndex = col + (i * BOARD_SIZE);
      console.log(colIndex);
      boxIndex = (r + Math.floor(i / BOX_SIZE)) * BOARD_SIZE + c + (i % BOX_SIZE);
      console.log(boxIndex);

      // MUST BE double equals here!
      // Loose equality compares two values for equality,
      // after converting both values to a common type.
      // The value from the input is a text and the num is a Number
      if (num === BOARD[rowIndex].value ||
          num === BOARD[colIndex].value ||
          num === BOARD[boxIndex].value) return false;
    }

    // Return true if this square is free!
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
