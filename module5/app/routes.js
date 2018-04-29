(function () {
'use strict';

angular.module('ValidationApp')
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
    url: '/myInfo', // must be HTTPS to be valid.
    templateUrl: 'https://jmsanta.github.io/coursera/module5/templates/myInfo.html'
  })

  // Item detail
  .state('signin', {
    url: '/signin', // must be HTTPS to be valid.
    templateUrl: 'https://jmsanta.github.io/coursera/module5/templates/signup.html',
    controller: 'siginController as ctrl',
	 resolve : {
			 //return ctrl.form.$valid;
		  }
	  }
  });

}

})();
