angular
  .module('infamousCriminals')
  .controller('CriminalsCtrl', CriminalsCtrl);

CriminalsCtrl.$inject = ['$http'];
function CriminalsCtrl($http) {
  const vm        = this;
  vm.all          = [];
  vm.newCriminal  = {};
  vm.create       = criminalsCreate;
  vm.index        = criminalsIndex;
  vm.delete       = criminalsDelete;

  const url = 'http://localhost:3000/api/';

  criminalsIndex();

  function criminalsIndex() {
    $http
      .get(`${url}criminals`)
      .then(response => {
        vm.all = response.data;
      });
  }

  function criminalsCreate() {
    $http
      .post(`${url}criminals`, vm.newCriminal)
      .then(response => {
        vm.all.push(response.data);
        vm.newCriminal = {};
      });
  }

  function criminalsDelete(criminal) {
    $http
      .delete(`${url}criminals/${criminal._id}`)
      .then(() => {
        const index = vm.all.indexOf(criminal);
        vm.all.splice(index, 1);
      });
  }
}
