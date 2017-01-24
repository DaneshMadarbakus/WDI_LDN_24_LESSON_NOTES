angular
  .module('lightsaberApp')
  .controller('CharactersIndexCtrl', CharactersIndexCtrl);

CharactersIndexCtrl.$inject = ['API', '$http'];
function CharactersIndexCtrl(API, $http) {
  const vm  = this;
  vm.delete = charactersDelete;

  charactersIndex();

  function charactersIndex(){
    return $http
      .get(`${API}/characters`)
      .then(response => {
        vm.characters = response.data;
      }, onError);
  }

  function charactersDelete(character){
    return $http
      .delete(`${API}/characters/${character._id}`)
      .then(charactersIndex, onError);
  }

  function onError(err) {
    console.log(err);
  }
}
