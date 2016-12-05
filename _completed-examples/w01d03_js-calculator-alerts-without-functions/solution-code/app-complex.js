alert('Welcome to the calculator!');

var running = true;
while (running) {
  // Ask the user for the operation
  var operator = prompt('What do you want to do? (p)lus / (s)ubtract / (d)ivide / (m)ultiply').toLowerCase();
  // If the user doesn't give the correct answer
  while (['p', 's', 'd', 'm'].indexOf(operator) === -1) {
    operator = prompt('Please choose again. What do you want to do? (p)lus / (s)ubtract / (d)ivide / (m)ultiply').toLowerCase();
  }

  // Ask the user for the first number
  var first = parseFloat(prompt('What is your first number?'));
  // Ensure that the user has given a number
  while (isNaN(first)) {
    first = parseFloat(prompt('Try again... What is your first number?'));
  }

  // Ask the user for the second number
  var second = parseFloat(prompt('What is your second number?'));
  // Ensure that the user has given a number
  while (isNaN(second)) {
    second = parseFloat(prompt('Try again... What is your second number?'));
  }

  // Use a switch statement to calculate the answer
  var answer;
  switch(operator){
    case 'p':
      answer = first + second;
      break;
    case 's':
      answer = first - second;
      break;
    case 'd':
      answer = first / second;
      break;
    case 'm':
      answer = first * second;
      break;
  }

  // Alert the answer to the user
  alert('The answer is '+ answer);

  // Ask the user if they want to continue
  var input = prompt('Do you want to quit (y)es. Press any other key to continue.').toLowerCase();
  running = (input === 'y') ? false : true;
}
alert('Thank you for using the calculator!');
