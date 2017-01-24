angular
  .module('serviceVsFactoryVsProvider')
  .service('myService', ServiceFunc);

// Service is like a constructor function 'itself'.
// The $injector will instantiate (new) the service as it injects it...
function ServiceFunc() {
  console.log('ServiceFunc run.');

  this.sayHello = function(text) {
    return 'Service says "Hello ' + text + '"';
  };
}