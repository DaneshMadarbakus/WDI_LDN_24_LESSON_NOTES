var TicTacToe = TicTacToe || {};

TicTacToe.resetBoard = function() {
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i].innerHTML = '';
    this.cells[i].setAttribute('class','clear');
  }
  this.winCounter = 0;
  this.counter    = 0;
  this.OMoves     = [];
  this.XMoves     = [];
  this.display.innerHTML = 'Hillary\'s Turn';
};

TicTacToe.checkForWin = function(movesArray, player) {
  for (var i = 0; i < this.winningCombinations.length; i++) {
    this.winCounter = 0;
    for (var j = 0; j < this.winningCombinations[i].length; j++) {
      if(movesArray.indexOf(this.winningCombinations[i][j]) !== -1) {
        this.winCounter++;
      }
      if(this.winCounter === 3) {
        alert('Game Over, ' + player + ' Wins!');
        this.resetBoard();
      }
    }
  }
};

TicTacToe.updateCell = function(array, cell, className) {
  array.push(parseInt(cell.id));
  cell.innerHTML = className[0];
  cell.setAttribute('class', className);
  var next = className === 'Hillary' ? 'Trump' : 'Hillary';
  this.display.innerHTML = next + '\'s Turn';
  this.counter++;
};

TicTacToe.addXorO = function(e) {
  if(e.target.innerHTML.length === 0) {
    if (this.counter % 2 === 0) {
      this.updateCell(this.OMoves, e.target, 'Hillary');
      this.checkForWin(this.OMoves, 'Trump');
    } else {
      this.updateCell(this.XMoves, e.target, 'Trump');
      this.checkForWin(this.XMoves, 'Hillary');
    }
  }
};

TicTacToe.addClickListeners = function(array, callback) {
  for (var i = 0; i < array.length; i++) {
    array[i].addEventListener('click', callback);
  }
};

TicTacToe.assignListeners = function() {
  this.addClickListeners(this.cells, this.addXorO.bind(this));
  this.addClickListeners(this.clear, this.resetBoard.bind(this));
};

TicTacToe.setup = function() {
  this.cells               = document.getElementsByTagName('li');
  this.clear               = document.getElementsByTagName('button');
  this.display             = document.querySelector('#display');
  this.counter             = 0;
  this.winCounter          = 0;
  this.XMoves              = [];
  this.OMoves              = [];
  this.winningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];

  this.assignListeners();
};

window.onload = function() {
  TicTacToe.setup();
};
