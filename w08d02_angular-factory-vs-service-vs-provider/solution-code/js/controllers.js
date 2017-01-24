angular
  .module('serviceVsFactoryVsProvider')
  .controller('firstController', firstController)
  .controller('secondController', secondController);

function firstController(myService, myFactory, myProvider, myValue) {
  console.log('firstController instantiated');
  this.helloFromService  = myService.sayHello('World');
  this.helloFromFactory  = myFactory.sayHello('World');
  this.helloFromProvider = myProvider.sayHello();
  this.fromValue         = myValue;
}

function secondController(myService, myFactory, myProvider, myValue) {
  console.log('secondController instantiated');
  this.helloFromService  = myService.sayHello('World');
  this.helloFromFactory  = myFactory.sayHello('World');
  this.helloFromProvider = myProvider.sayHello();
  this.fromValue         = myValue;
}