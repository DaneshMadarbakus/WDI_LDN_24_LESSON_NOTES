angular
  .module('serviceVsFactoryVsProvider')
  .factory('myFactory', FactoryFunc);

// Factories allow you to configure a function that returns an object
function FactoryFunc() {
  console.log('FactoryFunc run.');

  return {
    sayHello: function(text) {
      return 'Factory says "Hello ' + text + '"';
    }
  };
}