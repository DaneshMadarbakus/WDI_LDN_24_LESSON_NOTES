angular
  .module('lightsaberApp')
  .controller('CharactersShowCtrl', CharactersShowCtrl);

CharactersShowCtrl.$inject = ['API', '$stateParams', '$resource'];
function CharactersShowCtrl(API, $stateParams, $resource) {
  const vm     = this;
  const Character = $resource(`${API}/characters/:id`,
    { id: '@_id' });

  vm.character = Character.get($stateParams);
}
