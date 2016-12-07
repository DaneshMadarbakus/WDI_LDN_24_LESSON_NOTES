var Game = Game || {};

Game.winConditions = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

Game.checkForWin = function checkForWin() {
  if (this.humanMove === this.botMove) {
    this.message.innerHTML = 'You played ' +this.humanMove+ ' and the computer played ' + this.botMove+ '. Your result is a draw.';
  } else if (this.winConditions[this.humanMove] === this.botMove) {
    this.message.innerHTML = 'You played ' +this.humanMove+ ' and the computer played ' + this.botMove+ '. Your result is a win.';
    this.playerScore.innerHTML = parseInt(this.playerScore.innerHTML) + 1;
  } else {
    this.message.innerHTML = 'You played ' +this.humanMove+ ' and the computer played ' + this.botMove+ '. Your result is a loss.';
    this.botScore.innerHTML = parseInt(this.botScore.innerHTML) + 1;
  }
};

Game.moves = function moves() {
  return Object.keys(this.winConditions);
};

Game.chooseRandomIndex = function chooseRandomIndex() {
  return Math.floor(Math.random() * this.buttons.length);
};

Game.botClickButton = function botClickButton() {
  var randomIndex = this.chooseRandomIndex();
  // Using the `Object.keys()` function, we can get all of the keys from the
  // Game.winConditions object - which gives us all of the possible moves in the
  // game.
  var moves    = Object.keys(this.winConditions);
  // Use the randomIndex to choose a move
  this.botMove = moves[randomIndex];
  this.checkForWin();
};

Game.clickButton = function clickButton(e) {
  this.humanMove = e.target.id;
  this.botClickButton();
};

Game.addListeners = function addListeners() {
  // Loop through the buttons
  for (var i = 0; i < this.buttons.length; i++) {
    // We're changing the value of this here AGAIN because by default
    // the value of `this` would have been a button.
    this.buttons[i].addEventListener('click', this.clickButton.bind(this));
  }
};

Game.start = function start() {
  var body = document.getElementsByTagName('body')[0];
  var moves = this.moves();
  this.buttons = [];
  for (var i = 0; i < moves.length; i++) {
    var button = document.createElement('button');
    button.id = moves[i];
    button.innerHTML = moves[i].toUpperCase();
    body.appendChild(button);
    this.buttons.push(button);
  }

  this.playerScore = document.createElement('h1');
  this.playerScore.innerHTML = 0;
  body.appendChild(this.playerScore);

  this.botScore = document.createElement('h1');
  this.botScore.innerHTML = 0;
  body.appendChild(this.botScore);

  this.message = document.createElement('h2');
  body.appendChild(this.message);
  this.message.innerHTML = 'Click to play';

  this.addListeners();
};

// Setup an event listener to wait for when the document has finished loading
// the DOM. When this has fired, the callback function (second argument) will
// be triggered.
//
// By default, the value of `this` in the callback function will be the
// `document` as this is the element that triggered the eventListener.
//
// However, it is going to be more useful to us for `this` to be `Game` as this
// will mean that we will be able to access other properties and functions of
// the Game object.
document.addEventListener('DOMContentLoaded', Game.start.bind(Game));
