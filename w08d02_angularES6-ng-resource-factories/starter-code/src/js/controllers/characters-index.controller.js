angular
  .module('lightsaberApp')
  .controller('CharactersIndexCtrl', CharactersIndexCtrl);

CharactersIndexCtrl.$inject = ['API', '$resource'];
function CharactersIndexCtrl(API, $resource) {
  const vm  = this;

  const Character = $resource(`${API}/characters/:id`,
    { id: '@_id' }
    // {
    //   'get': { method: 'GET' },
    //   'save': { method: 'POST' },
    //   'remove': { method: 'DELETE' },
    //   'delete': { method: 'DELETE' },
    //   'query': { method: 'GET', isArray: true }
    // }
  );

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
