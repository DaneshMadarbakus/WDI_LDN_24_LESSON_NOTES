angular
  .module('lightsaberApp')
  .controller('CharactersEditCtrl', CharactersEditCtrl);

CharactersEditCtrl.$inject = ['API', '$http', '$stateParams', '$state'];
function CharactersEditCtrl(API, $http, $stateParams, $state) {
  const vm     = this;
  vm.character = {};
  vm.update    = charactersUpdate;

  charactersShow();

  function charactersShow(){
    return $http
      .get(`${API}/characters/${$stateParams.id}`)
      .then(response => {
        vm.character = response.data;
      }, onError);
  }

  function charactersUpdate(){
    return $http
      .put(`${API}/characters/${$stateParams.id}`, vm.character)
      .then(() => {
        $state.go('charactersShow', {id: vm.character._id});
      }, onError);
  }

  function onError(err) {
    console.log(err);
  }
}
