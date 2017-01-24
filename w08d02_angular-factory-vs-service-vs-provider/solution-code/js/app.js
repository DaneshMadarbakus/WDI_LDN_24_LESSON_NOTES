angular
  .module('serviceVsFactoryVsProvider', [])
  .value('myValue', 'Hi I\'m a value')
  .constant('myConstant', 'Hi I\'m a constant')
  .config(ConfigFunc);

function ConfigFunc(myProviderProvider, myConstant) {
  // Providers are the only service that can be passed into config.
  // Use a provider when you want to provide module-wide configuration for your service object before making it available.
  myProviderProvider.text = 'World';

  console.log('The constant is: ', myConstant);
}

