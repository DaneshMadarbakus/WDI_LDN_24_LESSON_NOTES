angular
  .module('introToAngular', [])
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [];
function HomeCtrl(){
  const vm = this;
  vm.awesome = true;
}
