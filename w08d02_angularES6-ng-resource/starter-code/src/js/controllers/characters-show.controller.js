angular
  .module('lightsaberApp')
  .controller('CharactersShowCtrl', CharactersShowCtrl);

CharactersShowCtrl.$inject = ['API', '$http', '$stateParams'];
function CharactersShowCtrl(API, $http, $stateParams) {
  const vm     = this;
  vm.character = {};

  charactersShow();

  function charactersShow(){
    return $http
      .get(`${API}/characters/${$stateParams.id}`)
      .then(response => {
        vm.character = response.data;
      }, onError);
  }

  function onError(err) {
    console.log(err);
  }
}
