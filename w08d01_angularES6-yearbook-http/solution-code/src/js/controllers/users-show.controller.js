angular
  .module('wdiYearbook')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$http', 'API', '$state', '$stateParams'];
function UsersShowCtrl($http, API, $state, $stateParams){
  const vm = this;

  usersShow();

  function usersShow(){
    return $http
      .get(`${API}/users/${$stateParams.id}`)
      .then(response => {
        vm.user = response.data;
      });
  }

  vm.delete = function usersDelete(){
    return $http
      .delete(`${API}/users/${$stateParams.id}`)
      .then(() => {
        $state.go('usersIndex');
      });
  };
}
