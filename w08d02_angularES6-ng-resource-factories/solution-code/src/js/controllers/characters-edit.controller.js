angular
  .module('lightsaberApp')
  .controller('CharactersEditCtrl', CharactersEditCtrl);

CharactersEditCtrl.$inject = ['API', '$stateParams', '$state', 'Character'];
function CharactersEditCtrl(API, $stateParams, $state, Character) {
  const vm     = this;

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
