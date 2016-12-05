alert('Welcome to the calculator!');

var running = true;
while (running) {
  // Ask the user what operation they want to do. Ensure the input is lowercase.
  var type = prompt('What type of operation do you want to do? (b)asic / (a)dvanced / (m)ortgage / bm(i) / (t)rip?').toLowerCase();
  while(['b', 'a', 'm', 'i', 't'].indexOf(type) === -1) {
    type = prompt('Please try again... What type of operation do you want to do? (b)asic / (a)dvanced / (m)ortgage / bm(i) / (t)rip?').toLowerCase();
  }

  switch (type) {
    case 'b':
      // Basic Calculator
      // Ask the user what basic operation they want to do
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
      break;

    case 'a':
      // Advanced calculator
      // As the user for the operation that they want to perform
      var operation   = prompt('What do you want to do? (p)ower, (s)qrt: ').toLowerCase();
      // Check that the user has given one of the options
      while (['p', 's'].indexOf(operation) === -1) {
        operation = prompt('Try again... What do you want to do? (p)ower, (s)qrt: ').toLowerCase();
      }

      switch (operation) {
        case 's':
          // Ask the user for a number to square
          var first = parseFloat(prompt('What number do you want to square?'));
          while (isNaN(first)) {
            first = parseFloat(prompt('Try again... What number do you want to square?'));
          }
          alert('the result is '+ Math.sqrt(first));
          break;

        case 'p':
          // Ask the user for a number to power
          var first = parseFloat(prompt('What number do you want to power?'));
          while (isNaN(first)) {
            first = parseFloat(prompt('Try again... What number do you want to power?'));
          }

          //  Ask the user for the power value
          var second = parseFloat(prompt('What is the power?'));
          while (isNaN(second)) {
            second = parseFloat(prompt('Try again... What is the power?'));
          }
          alert('The result is '+ Math.pow(first, second));
          break;
      }

      break;

    case 'm':
      var loan = parseFloat(prompt('What is your loan (£)'));
      var apr  = parseFloat(prompt('What is your APR (%)')) / 100 / 12;
      var term = parseFloat(prompt('What is the term (months)'));

      var temp    = Math.pow((1 + apr), term);
      var payment = loan * apr * temp / (temp - 1);

      // Round to 2 decimal places
      payment = Math.round(payment * 100) / 100;
      alert('Your monthly payment will be £' + payment);

      break;

    case 'i':
      var mass   = parseFloat(prompt('What is your mass? (KG)'));
      var height = parseFloat(prompt('Height (Meters)'));
      var bmi    = (mass / Math.pow(height, 2));

      // Round to 2 decimal places
      bmi = Math.round(bmi * 100) / 100;

      alert('Your BMI is ' + bmi);
      break;

    case 't':
      var dist  = parseFloat(prompt('What is your distance (miles)?'));
      var mpg   = parseFloat(prompt('What is your car\'s MPG?'));
      var cost  = parseFloat(prompt('What is the cost (£/gallon)?'));
      var speed = parseFloat(prompt('What is your speed (MPH)?'));
      var time  = dist / speed;

      // Round to 2 decimal places
      time = Math.round(time * 100) / 100;

      var actualMPG;
      if (mpg > 60) {
        actualMPG = mpg - (speed - 60) * 2;
      } else {
        actualMPG = mpg;
      }

      var cost = dist / actualMPG * cost;
      // Round to 2 decimal places
      cost = Math.round(cost * 100) / 100;

      alert('Your trip will take ' + time + ' hours and cost £' + cost + '.');

      break;
  }

  var input = prompt('Do you want to quit (y)es. Press any other key to continue.').toLowerCase();
  running = (input === 'y') ? false : true;
}
alert('Thank you for using the calculator!');
