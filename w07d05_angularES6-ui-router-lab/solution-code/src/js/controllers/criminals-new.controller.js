angular
  .module('infamousCriminals')
  .controller('CriminalsNewCtrl', CriminalsNewCtrl);

CriminalsNewCtrl.$inject = ['$http', 'API', '$state'];
function CriminalsNewCtrl($http, API, $state) {
  const vm        = this;
  vm.newCriminal  = {};
  vm.create       = criminalsCreate;

  function criminalsCreate() {
    $http
      .post(`${API}/criminals`, vm.newCriminal)
      .then(() => {
        $state.go('criminalsIndex');
      });
  }
}
