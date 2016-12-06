function foo() {
  console.log(this.a);
}

var a = 2;

foo(); //2
alert(this); //[object Window]