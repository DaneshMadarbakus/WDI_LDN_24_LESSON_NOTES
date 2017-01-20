angular
  .module('infamousCriminals')
  .controller('CriminalsIndexCtrl', CriminalsIndexCtrl);

CriminalsIndexCtrl.$inject = ['$http', 'API'];
function CriminalsIndexCtrl($http, API) {
  const vm        = this;
  vm.all          = [];

  criminalsIndex();

  function criminalsIndex() {
    $http
      .get(`${API}/criminals`)
      .then(response => {
        vm.all = response.data;
      });
  }
}
