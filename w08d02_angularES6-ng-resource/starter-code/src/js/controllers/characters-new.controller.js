angular
  .module('lightsaberApp')
  .controller('CharactersNewCtrl', CharactersNewCtrl);

CharactersNewCtrl.$inject = ['API', '$http', '$state'];
function CharactersNewCtrl(API, $http, $state) {
  const vm  = this;

  vm.create = charactersCreate;

  function charactersCreate(){
    return $http
      .post(`${API}/characters`, vm.character)
      .then(() => {
        $state.go('charactersIndex');
      }, onError);
  }

  function onError(err) {
    console.log(err);
  }
}
