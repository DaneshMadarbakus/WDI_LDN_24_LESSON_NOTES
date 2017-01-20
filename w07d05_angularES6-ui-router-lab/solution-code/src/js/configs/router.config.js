angular
  .module('infamousCriminals')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('criminalsIndex', {
    url: '/criminals',
    templateUrl: '/js/views/criminals/index.html',
    controller: 'CriminalsIndexCtrl',
    controllerAs: 'criminals'
  })
  .state('criminalsNew', {
    url: '/criminals/new',
    templateUrl: '/js/views/criminals/new.html',
    controller: 'CriminalsNewCtrl',
    controllerAs: 'criminals'
  })
  .state('crinimalsShow', {
    url: '/criminals/:id',
    templateUrl: '/js/views/criminals/show.html',
    controller: 'CriminalsShowCtrl',
    controllerAs: 'criminals'
  });

  $urlRouterProvider.otherwise('/index');
}
