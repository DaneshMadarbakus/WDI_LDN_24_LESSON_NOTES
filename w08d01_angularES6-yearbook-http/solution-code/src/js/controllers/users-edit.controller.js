angular
  .module('wdiYearbook')
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['$http', 'API', '$state', '$stateParams'];
function UsersEditCtrl($http, API, $state, $stateParams){
  const vm = this;

  usersShow();

  function usersShow(){
    return $http
      .get(`${API}/users/${$stateParams.id}`)
      .then(response => {
        vm.user = response.data;
      });
  }

  vm.update = function usersUpdate(){
    return $http
      .put(`${API}/users/${vm.user._id}`, vm.user)
      .then(() => {
        $state.go('usersIndex');
      });
  };
}
