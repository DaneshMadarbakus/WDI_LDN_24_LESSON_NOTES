angular
  .module('infamousCriminals')
  .controller('CriminalsShowCtrl', CriminalsShowCtrl);

CriminalsShowCtrl.$inject = ['$http', 'API', '$stateParams', '$state'];
function CriminalsShowCtrl($http, API, $stateParams, $state) {
  const vm        = this;
  vm.delete       = criminalsDelete;

  criminalsShow();

  function criminalsShow() {
    $http
      .get(`${API}/criminals/${$stateParams.id}`)
      .then(response => {
        console.log(response.data)
        vm.criminal = response.data;
      });
  }

  function criminalsDelete() {
    $http
      .delete(`${API}/criminals/${$stateParams.id}`)
      .then(() => {
        $state.go('criminalsIndex');
      });
  }
}
