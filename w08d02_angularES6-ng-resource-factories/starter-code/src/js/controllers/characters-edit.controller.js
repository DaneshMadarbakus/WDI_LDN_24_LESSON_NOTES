angular
  .module('lightsaberApp')
  .controller('CharactersEditCtrl', CharactersEditCtrl);

CharactersEditCtrl.$inject = ['API', '$stateParams', '$state', '$resource'];
function CharactersEditCtrl(API, $stateParams, $state, $resource) {
  const vm     = this;

  const Character = $resource(`${API}/characters/:id`,
    { id: '@_id' },
    {
      'update': { method: 'PUT' }
    }
  );

  vm.character = Character.get($stateParams);
  vm.update    = charactersUpdate;

  function charactersUpdate(){
    Character
      .update({ id: $stateParams.id }, vm.character)
      .$promise
      .then(() => {
        $state.go('charactersIndex');
      });
  }
}
