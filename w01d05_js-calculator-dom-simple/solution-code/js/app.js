document.addEventListener('DOMContentLoaded', start);

function start() {
  var form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', calculate);
}

function calculate(e) {
  e.preventDefault();

  var num1     = parseFloat(document.getElementById('firstNumber').value);
  var num2     = parseFloat(document.getElementById('secondNumber').value);
  var operator = document.getElementById('operator').value;
  var answer   = document.getElementById('answer');
  var result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
  }

  answer.innerHTML = result;
}
