angular
  .module('serviceVsFactoryVsProvider')
  .provider('myProvider', ProviderFunc);

// Provider are constructor functions. When instantiated they must contain a property called $get, which holds the service factory function.
function ProviderFunc() {
  console.log('ProviderFunc run.');

  // This is basically a factory...
  function SomeConstructor() {
    return {
      sayHello: function() {
        return 'Provider says "Hello ' + this.text + '"';
      },
      text: this.text
    };
  }

  this.$get = SomeConstructor;
}