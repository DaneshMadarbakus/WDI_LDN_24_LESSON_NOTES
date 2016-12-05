window.onload           = start;

var cells               = null;
var display             = null;
var counter             = 0;
var winCounter          = 0;
var XMoves              = [];
var OMoves              = [];
var winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];

function start() {
  cells = document.getElementsByTagName('li');
  addCellListener(cells);

  document.getElementById('clear').addEventListener('click', resetBoard);
}

function addCellListener(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].addEventListener('click', addXorO);
  }
}

function addXorO() {
  display = document.querySelector('#display');

  if (this.innerHTML.length === 0) {
    if (counter % 2 === 0) {
      OMoves.push(parseInt(this.getAttribute('id')));
      this.innerHTML = 'H';
      this.setAttribute('class', 't');
      display.innerHTML = 'Trump\'s Turn';
      counter ++;
      checkForWin(OMoves, 'Hillary');
    } else {
      XMoves.push(parseInt(this.getAttribute('id')));
      this.innerHTML = 'T';
      this.setAttribute('class', 'h');
      display.innerHTML = 'Hillary\'s Turn';
      counter ++;
      checkForWin(XMoves, 'Trump');
    }

    if (counter >= 9){
      display.innerHTML = 'Game Over!';
      var conf = confirm('It\'s a draw, do you want to play again?');
      if(conf){
        resetBoard();
      }
    }
  }
}

function checkForWin(movesArray, player) {
  for (var i = 0; i < winningCombinations.length; i++) {
    winCounter = 0;
    for (var j = 0; j < winningCombinations[i].length; j++) {
      if(movesArray.indexOf(winningCombinations[i][j]) !== -1) {
        winCounter++;
      }
      if(winCounter === 3) {
        alert('Game Over, ' + player + ' Wins!');
        resetBoard();
      }
    }
  }
}

function resetBoard() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].setAttribute('class','clear');
  }
  winCounter = 0;
  counter    = 0;
  OMoves     = [];
  XMoves     = [];
  display.innerHTML = 'Hillary\'s Turn';
}
