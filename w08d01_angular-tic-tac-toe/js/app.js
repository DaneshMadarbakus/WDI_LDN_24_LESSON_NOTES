angular
  .module('tictactoe', [])
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];
function MainCtrl(){
  const vm        = this;
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  let turnsPlayed = 0;
  let over        = false;
  let xMoves      = [];
  let oMoves      = [];
  vm.reset = reset;
  reset();

  vm.move = function(index){
    if (vm.squares[index]) return false;

    if (turnsPlayed % 2 === 0) {
      vm.squares[index] = 'x';
      xMoves.push(index);
      over = checkForWin(xMoves);
      if (over) vm.message = 'x has won';
    } else {
      vm.squares[index] = 'o';
      oMoves.push(index);
      over = checkForWin(oMoves);
      if (over) vm.message = 'o has won';
    }
    turnsPlayed++;
    if (turnsPlayed === 9 && !over) {
      over = true;
      vm.message = 'it\'s a draw';
    }
  };

  function checkForWin(movesArray) {
    for (let i = 0; i < winCombos.length; i++) {
      let counter = 0;
      for (let j = 0; j < winCombos[i].length; j++) {
        if (movesArray.indexOf(winCombos[i][j]) !== -1) counter++;
        if (counter === 3) return true;
      }
    }
  }

  function reset() {
    vm.squares  = new Array(9);
    vm.message  = '';
    turnsPlayed = 0;
    over        = false;
    xMoves      = [];
    oMoves      = [];
  }
}
