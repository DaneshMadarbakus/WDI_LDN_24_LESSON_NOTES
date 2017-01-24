angular
  .module('lightsaberApp')
  .controller('CharactersShowCtrl', CharactersShowCtrl);

CharactersShowCtrl.$inject = ['API', '$stateParams', 'Character'];
function CharactersShowCtrl(API, $stateParams, Character) {
  const vm     = this;
  vm.character = Character.get($stateParams);
}
