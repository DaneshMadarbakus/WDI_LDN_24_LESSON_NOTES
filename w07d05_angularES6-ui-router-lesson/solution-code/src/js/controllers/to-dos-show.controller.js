angular
  .module('todoApp')
  .controller('ToDosShowCtrl', ToDosShowCtrl);

ToDosShowCtrl.$inject = ['$state'];
function ToDosShowCtrl($state){
  const vm = this;
  vm.back = function(){
    $state.go('home');
  };
}
