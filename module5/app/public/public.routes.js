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
      templateUrl: 'app/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'app/public/home/home.html'
    })
    .state('public.my-info', {
      url: '/my-info',
      templateUrl: 'app/public/home/my-info.html',
      controller: "RegistrationController",
      controllerAs: "reg",

    })
    .state('public.sign-up', {
      url: '/sign-up',
      templateUrl: 'app/public/home/sign-up.html',
      controller: "RegistrationController",
      controllerAs: "reg",
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'app/public/menu/menu.html',
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
      templateUrl: 'app/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
