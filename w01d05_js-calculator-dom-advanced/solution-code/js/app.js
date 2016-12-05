document.addEventListener('DOMContentLoaded', start);

var firstNumber;
var secondNumber;
var operator;
var numbers;
var operators;
var eq;
var clear;
var display;

function start() {
  // Setup initial state variables
  numbers = document.getElementsByClassName('number');
  operators = document.getElementsByClassName('operator');
  eq = document.getElementsByClassName('equals')[0];
  clear = document.getElementsByClassName('clear')[0];
  display = document.getElementsByClassName('display')[0];

  // Initially clear calculator
  reset();

  // Setup eventListeners
  for( var i = 0; i < numbers.length; i++ ) {
    numbers[i].addEventListener('click', setNumber);
  }

  for( var i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', setOperator);
  }

  eq.addEventListener('click', calculate);

  clear.addEventListener('click', reset);
}

// Functions for calculator
function add() {
  return firstNumber + secondNumber;
}

function subtract() {
  return firstNumber - secondNumber;
}

function divide() {
  return firstNumber / secondNumber;
}

function multiply() {
  return firstNumber * secondNumber;
}

function calculate() {
  switch (operator) {
    case '+':
      updateDisplay(add());
      break;
    case '-':
      updateDisplay(subtract());
      break;
    case '/':
      updateDisplay(divide());
      break;
    case 'x':
      updateDisplay(multiply());
      break;
  }
}

function reset() {
  firstNumber   = '';
  secondNumber  = '';
  operator;
  display.value = '';
}

function setNumber() {
  var value = parseInt(this.value);

  if (firstNumber === '') {
    firstNumber = value
  } else {
    secondNumber = value
  }

  updateDisplay(value);
}

function setOperator() {
  operator = this.value;
  console.log(operator);
}

function updateDisplay(value) {
  display.value = value;
}
