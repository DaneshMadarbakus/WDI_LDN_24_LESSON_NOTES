angular
  .module('lightsaberApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('charactersIndex', {
      url: '/',
      templateUrl: '/js/views/characters/index.html',
      controller: 'CharactersIndexCtrl',
      controllerAs: 'characters'
    })
    .state('charactersNew', {
      url: '/characters/new',
      templateUrl: '/js/views/characters/new.html',
      controller: 'CharactersNewCtrl',
      controllerAs: 'characters'
    })
    .state('charactersShow', {
      url: '/characters/:id',
      templateUrl: '/js/views/characters/show.html',
      controller: 'CharactersShowCtrl',
      controllerAs: 'characters'
    })
    .state('charactersEdit', {
      url: '/characters/:id/edit',
      templateUrl: '/js/views/characters/edit.html',
      controller: 'CharactersEditCtrl',
      controllerAs: 'characters'
    });

  $urlRouterProvider.otherwise('/');
}
