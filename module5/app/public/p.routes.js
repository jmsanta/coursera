(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
	
	 // Home page
  .state('home', {
    url: '/home',
    templateUrl: 'https://jmsanta.github.io/coursera/module5/templates/home.html'
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
    controller: 'SignupController as ctrl'
	 
  });

}
})();