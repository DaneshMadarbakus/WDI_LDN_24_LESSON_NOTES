// Example 1
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(){
  function counter(a, b) {
    return a + b;
  }
  return counter();
}

count(a, b);
// => undefined

// Example 2
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(){
  function counter(a, b) {
    return a + b;
  }
  return counter(a);
}

count(a, b);
// => NaN

// Example 3
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(){
  function counter(a, b) {
    return a + b;
  }
  return counter(a);
}

count();
// => NaN

// Example 4
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(a, b){
  function counter(a, b) {
    return a + b;
  }
  return counter();
}

count(a, b);
// => undefined

// Example 5
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(a, b){
  function counter(a, b) {
    return a + b;
  }
  return counter(a, b);
}

count(a, b);

// Example 6
var a, b, c;

a = 1;
b = 2;
c = 3;

function count(){
  function counter(a, b) {
    return a + b;
  }
  return counter(a, b);
}

count();
// => 3
