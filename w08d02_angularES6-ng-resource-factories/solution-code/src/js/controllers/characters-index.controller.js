angular
  .module('lightsaberApp')
  .controller('CharactersIndexCtrl', CharactersIndexCtrl);

CharactersIndexCtrl.$inject = ['API', 'Character'];
function CharactersIndexCtrl(API, Character) {
  const vm  = this;
  vm.delete = charactersDelete;

  charactersIndex();

  function charactersIndex(){
    vm.characters = Character.query();
  }

  function charactersDelete(character){
    Character
      .delete({ id: character._id })
      .$promise
      .then(() => {
        charactersIndex();
      });
  }
}
