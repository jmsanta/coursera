(function() {

'use strict';

angular.module('public')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // THE Routes
  $stateProvider
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'app/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
          console.log("menu categories service resolved....");
        }]
      }
    })
    
	.state('public', {
      abstract: true,
      templateUrl: 'app/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'templates/home/home.html'
    })
    .state('public.my-info', {
      url: '/my-info',
      templateUrl: 'templates/home/myinfo.html',
      controller: "SignupController",
      controllerAs: "regiControl",

    })
    .state('public.sign-up', {
      url: '/sign-up',
      templateUrl: 'templates/home/signup.html',
      controller: "SignupController",
      controllerAs: "regiControl",
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'app/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
           console.log("menu categories service resolved.... for category" + $stateParams.category);
        }]
      }
    });
}
})();
