angular
  .module('wdiYearbook')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['$http', 'API'];
function UsersIndexCtrl($http, API){
  const vm = this;

  usersIndex();

  function usersIndex(){
    return $http
      .get(`${API}/users`)
      .then(response => {
        vm.users    = response.data;
      });
  }
}
