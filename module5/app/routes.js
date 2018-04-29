(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'index.html'
  })

  // myInfo
  .state('myInfo', {
    url: '/myInfo',
    templateUrl: 'templates/myInfo.html'
  })

  // Item detail
  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'siginController as ctrl'
  });

}

})();
