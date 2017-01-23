angular
  .module('wdiYearbook')
  .controller('UsersNewCtrl', UsersNewCtrl);

UsersNewCtrl.$inject = ['$http', 'API', '$state'];
function UsersNewCtrl($http, API, $state){
  const vm = this;

  vm.usersCreate = function usersCreate(){
    return $http
      .post(`${API}/users`, vm.user)
      .then(() => {
        $state.go('usersIndex');
      });
  };
}
