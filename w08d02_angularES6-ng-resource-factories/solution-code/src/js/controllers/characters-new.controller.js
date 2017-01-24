angular
  .module('lightsaberApp')
  .controller('CharactersNewCtrl', CharactersNewCtrl);

CharactersNewCtrl.$inject = ['API', '$state', 'Character'];
function CharactersNewCtrl(API, $state, Character) {
  const vm  = this;

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
