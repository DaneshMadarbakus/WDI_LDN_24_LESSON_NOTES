angular
  .module('lightsaberApp')
  .controller('CharactersNewCtrl', CharactersNewCtrl);

CharactersNewCtrl.$inject = ['API', '$state', '$resource'];
function CharactersNewCtrl(API, $state, $resource) {
  const vm  = this;

  const Character = $resource(`${API}/characters/:id`,
    { id: '@_id' });

  vm.create = charactersCreate;

  function charactersCreate(){
    return Character
      .save(vm.character)
      .$promise
      .then(() => {
        $state.go('charactersIndex');
      });
  }
}
