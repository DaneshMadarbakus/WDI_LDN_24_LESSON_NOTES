function foo(num) {
  console.log('foo: ' + num);

  // Does this keep track of how many times `foo` is called?
  this.count++;
  console.log(this.count);
}

foo.count = 0;

for (var i=0; i<10; i++) {
  if (i > 5) {
    foo(i);
  }
}

console.log('foo.count: ' + foo.count); // 0
console.log('window.count: ' + count);  // NaN